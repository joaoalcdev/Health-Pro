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
      const bitmap = fs.readFileSync("public/images/logo_cedejom.png");
      const logo = bitmap.toString('base64');

      //create pdf options
      var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "1mm",
            contents: ``
        },
        footer: {
            height: "10mm",
            contents: {
                first: '',
                default: '', // fallback value
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
          logo,
          professionalData: professionalData[0],
          payrollData: {...payrollData, professionalAmountDue: payrollData.professionalAmountDue.toFixed(2)},
          servicesData: servicesData,
          month: monthRange
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


