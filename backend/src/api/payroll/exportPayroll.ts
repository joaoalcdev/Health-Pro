import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment';

const fs = require('fs');
var pdf = require("pdf-creator-node");

export const exportPayroll = async (app: FastifyInstance) => {
  app.post("/payroll/export", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const {payrollData} = req.body as {payrollData: PayrollData}
      var { monthRange} = req.body as {monthRange: string} 

      monthRange = moment(monthRange).format('MM-YYYY');

      //Get professional data
      const { data: professionalData, error } = await supabase
      .from('view_professionals')
      .select()
      .eq('id', payrollData.professionalId)

      if(error){
        throw error;
      }
      
      //get template html
      var html = fs.readFileSync("src/templatePdf/template.html", "utf8");

      //create pdf options
      var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: `<h1 style="text-align: center; text-transform: uppercase;">RELATÓRIO ${monthRange}</h1>`
        },
        footer: {
            height: "28mm",
            contents: {
                first: '',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: ''
            }
          }  
      };

      //rebase data for template
     let servicesData = [] as any;
      payrollData.events.forEach((element: any) => { //cada convenio
        element.events.forEach((event: any) => { //cada serviço
          servicesData.push({
            serviceName: event.serviceName,
            qty: event.qty,
            amountDue: event.amountDue.toFixed(2),
            agreementName: element.agreementName,
            agreementQty: element.qty,
            agreementAmountDue: element.amountDue.toFixed(2),
          });
        });
      });

      //create pdf document 
      var doocument = {
        html: html,
        data: {
          professionalData: professionalData[0],
          payrollData: {...payrollData, professionalAmountDue: payrollData.professionalAmountDue.toFixed(2)},
          servicesData: servicesData
        },
        path: "./payroll.pdf", //path of pdf file on server
        type:'',
      };

      //pdf creation function
      await pdf.create(doocument, options)
      .then((res: any) => {
          console.log(res)
      })
      .catch((error: any) => {
          console.error(error)
          throw error;
      });

      //create stream and send pdf file
      const stream = fs.createReadStream('payroll.pdf'); 
      res.header('Content-Type', 'application/pdf');
      return res.send(stream).type('application/pdf').code(200);
      
    } catch (error) {
      res.send({error: error})
    }
  })
}


