import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';
import { getFee } from '../../utils/getFee';

export const getPayroll = async (app: FastifyInstance) => {
  app.get("/payroll/:monthRange", async (req: FastifyRequest, res: FastifyReply) => {

    var {monthRange } = req.params as {monthRange: string};

    monthRange = moment(monthRange,"dd-MM-YYYY").format()

    try {
      const { data, error } = await supabase
      .from('view_events')
      .select()
      .eq('eventStatus', 3)
      .gte('startTime', monthRange)
      .lte('endTime', moment(monthRange).endOf('month').format())
      .order('startTime', {ascending: true})

      const { data: agreements, error: errorAgreements } = await supabase
      .from('agreements')
      .select()
      .order('id', {ascending: true})

      const { data: fees, error: errorFees } = await supabase
      .from('fees')
      .select()

      if (error) {
        throw error
      }

    
      if(data && agreements && fees) {

        var totalAmountDue = 0 as number; // Valor total a ser pago a todos os Profissionais
        var totalGrossValue = 0 as number; // Valor da receita bruta total do mês
        var totalTax = 0 as number; // Valor total de impostos
        var totalProfit = 0 as number; // Valor total de lucro
        
        //Resume a lista em um objeto apenas com os dados dos profissionais que posuem eventos no mês
        var rebaseData = data.map((event) => {
            return {
              professionalId: event.professionalId,
              professionalName: `${event.professionalFirstName} ${event.professionalLastName}`,
              specialtyId: event.specialtyId,
            }
        }) as any[];
        
        //Remove os profissionais duplicados
        rebaseData = rebaseData.filter((v,i,a)=>a.findIndex(t=>(t.professionalId === v.professionalId))===i)
        
        //Percorre cada profissional e coloca os eventos dentro de um array events
        rebaseData = rebaseData.map((professional) => {
          
          var professionalGrossValue = 0 as number;
          var professionalAmountDue = 0 as number;
          var professionalTax = 0 as number;
          var professionalProfit = 0 as number;

          const eventsByProfessionals = data.filter((event) => event.professionalId === professional.professionalId)

          //separa os event
          var eventsByAgreement = eventsByProfessionals.filter((v,i,a)=>a.findIndex(t=>(t.agreementId === v.agreementId))===i).sort((a,b) => a.agreementId - b.agreementId)

          eventsByAgreement = eventsByAgreement.map((event): any => {
            console.log(event)

            //Calcula o valor bruto de cada Agreement
            const sumGrossValue = eventsByProfessionals.reduce((acc, e) => {
              if(e.agreementId === event.agreementId){
                return acc + e.grossValue
              }
              return acc
            } , 0)
            professionalGrossValue += sumGrossValue; // Incrementa o valor bruto do profissional
            totalGrossValue += sumGrossValue;       // Incrementa o valor bruto total

            //Calcula o valor a ser pago ao profissional por cada Agreement
            const sumProfessionalRate = eventsByProfessionals.reduce((acc, e) => {
              if(e.agreementId === event.agreementId){
                return acc + e.professionalRate
              }
              return acc
            } , 0 )
            professionalAmountDue += sumProfessionalRate; // Incrementa o valor a ser pago ao profissional
            totalAmountDue += sumProfessionalRate;       // Incrementa o valor a ser pago total
            
            //Calcula o valor total de impostos por cada Agreement
            const sumTax = eventsByProfessionals.reduce((acc, e) => {
              if(e.agreementId === event.agreementId){
                return acc + e.tax
              }
              return acc
            } , 0)
            professionalTax += sumTax; // Incrementa o valor total de impostos do profissional
            totalTax += sumTax;       // Incrementa o valor total de impostos

            //Calcula o valor total de lucro por cada Agreement
            const sumProfit = eventsByProfessionals.reduce((acc, e) => {
              if(e.agreementId === event.agreementId){
                return acc + e.profit
              }
              return acc
            } , 0)

            professionalProfit += sumProfit; // Incrementa o valor total de lucro do profissional
            totalProfit += sumProfit;       // Incrementa o valor total de lucro

            return {
                agreementId: event.agreementId,
                agreementName: agreements.find((agreement) => agreement.id === event.agreementId)?.name,
                amountDue: sumProfessionalRate,
                total: sumGrossValue,
                tax: sumTax.toFixed(2),
                profit: sumProfit.toFixed(2),
                events: eventsByProfessionals.filter((e) => e.agreementId === event.agreementId),
              }
          }) 
          return {
            ...professional,
            events: eventsByAgreement,
            professionalGrossValue,
            professionalAmountDue,
            professionalTax: professionalTax.toFixed(2),
            professionalProfit: professionalProfit.toFixed(2),
          }
        })

        var summaryPerAgreement = data.filter((v,i,a)=>a.findIndex(t=>(t.agreementId === v.agreementId))===i).sort((a,b) => a.agreementId - b.agreementId)

        summaryPerAgreement = summaryPerAgreement.map((event) => {
          return {
            agreementId: event.agreementId,
            agreementName: agreements.find((agreement) => agreement.id === event.agreementId)?.name,
            agreementGrossValue: data.reduce((acc, e) => {
              if(e.agreementId === event.agreementId){
                return acc + e.grossValue
              }
              return acc
            } , 0),
            agreementProfessionalAmountDue: data.reduce((acc, e) => {
              if(e.agreementId === event.agreementId){
                return acc + e.professionalRate
              }
              return acc
            } , 0),
            agreementTax: data.reduce((acc, e) => {
              if(e.agreementId === event.agreementId){
                return acc + e.tax
              }
              return acc
            } , 0),
            agreementProfit: data.reduce((acc, e) => {
              if(e.agreementId === event.agreementId){
                return acc + e.profit
              }
              return acc
            } , 0),
          }
        })

      
        return res.status(200).send(
          { 
            professionals: rebaseData,
            summary: {
              summaryPerAgreement: summaryPerAgreement,
              totalGrossValue,
              totalAmountDue,
              totalTax: totalTax.toFixed(2),
              totalProfit: totalProfit.toFixed(2),
            }
          })
       
      }else{
      
      }
      
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}


