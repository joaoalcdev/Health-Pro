import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment-timezone';

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
        var totalEvents = 0 as number; // Quantidade total de eventos
        
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
          var professionalEvents = 0 as number;
          
          //Recebe todos os eventos do profissional
          const eventsByProfessionals = data.filter((event) => event.professionalId === professional.professionalId)
          
          
          //separa os event
          var eventsByAgreement = eventsByProfessionals.filter((v,i,a)=>a.findIndex(t=>(t.agreementId === v.agreementId))===i).sort((a,b) => a.agreementId - b.agreementId)
          
          eventsByAgreement = eventsByAgreement.map((event): any => {
            
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
            professionalEvents += eventsByProfessionals.filter((e) => e.agreementId === event.agreementId).length;
            totalEvents += eventsByProfessionals.filter((e) => e.agreementId === event.agreementId).length;

            var groupByService = eventsByProfessionals.filter((e) => e.agreementId === event.agreementId)

            groupByService = groupByService.map((event) => {
              return{
                serviceId: event.serviceId ? event.serviceId : 0,
                serviceName: event.serviceName ? event.serviceName : 'Consulta/Avaliação',
                professional: event.professionalFirstName,
                agreementId: event.agreementId,
              }
            })

            groupByService = groupByService.filter((v,i,a)=>a.findIndex(t=>(t.serviceId === v.serviceId))===i).sort((a,b) => a.serviceId - b.serviceId)

            //console.log(eventsByProfessionals)
            var qtyEvents = 0;
            groupByService = groupByService.map((event) => {

              const eventsList = eventsByProfessionals.filter((e) => {
                return e.eventType === 4 && event.serviceId === 0 || e.serviceId === event.serviceId && e.agreementId === event.agreementId })

                qtyEvents += eventsList.length;

              return {
                serviceId: event.serviceId,
                serviceName: event.serviceName,
                total: eventsByProfessionals.reduce((acc, e) => {
                  if(e.eventType === 4 && event.serviceId === 0 || e.serviceId === event.serviceId && e.agreementId === event.agreementId){
                    return acc + e.grossValue
                  }
                  return acc
                } , 0),
                amountDue: eventsByProfessionals.reduce((acc, e) => {
                  if(e.eventType === 4 && event.serviceId === 0 || e.serviceId === event.serviceId && e.agreementId === event.agreementId){
                    return acc + e.professionalRate
                  }
                  return acc
                } , 0),
                tax: eventsByProfessionals.reduce((acc, e) => {
                  if(e.eventType === 4 && event.serviceId === 0 || e.serviceId === event.serviceId && e.agreementId === event.agreementId){
                    return acc + e.tax
                  }
                  return acc
                } , 0),
                profit: eventsByProfessionals.reduce((acc, e) => {
                  if(e.eventType === 4 && event.serviceId === 0 || e.serviceId === event.serviceId && e.agreementId === event.agreementId){
                    return acc + e.profit
                  }
                  return acc
                } , 0),
                events: eventsList,
                qty: eventsList.length
              }
            })
            
            return {
                agreementId: event.agreementId,
                agreementName: agreements.find((agreement) => agreement.id === event.agreementId)?.name,
                amountDue: sumProfessionalRate,
                total: sumGrossValue,
                tax: Number(sumTax.toFixed(2)),
                profit: Number(sumProfit.toFixed(2)),
                events: groupByService,
                qty: qtyEvents,
                //events: eventsByProfessionals.filter((e) => e.agreementId === event.agreementId),
              }
          }) 
          return {
            ...professional,
            events: eventsByAgreement,
            qty: professionalEvents,
            professionalGrossValue,
            professionalAmountDue,
            professionalTax: Number(professionalTax.toFixed(2)),
            professionalProfit: Number(professionalProfit.toFixed(2)),
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

        
        //console.log('==============  FIM ==============')

        //console.log(rebaseData)
        return res.status(200).send(
          { 
            professionals: rebaseData,
            summary: {
              summaryPerAgreement: summaryPerAgreement,
              totalGrossValue,
              totalAmountDue,
              totalTax: Number(totalTax.toFixed(2)),
              totalProfit: Number(totalProfit.toFixed(2)),
              totalEvents,
            }
          })
      }else{
        return res.status(400).send({error: 'Unable to get data'})
      }
      
    } catch (error) {
      return res.status(400).send(error)
    }
  })
}


