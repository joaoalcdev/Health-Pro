import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment';
import auth from "../../middlewares/auth";

const fs = require('fs');
var pdf = require("pdf-creator-node");

export const exportExternalServices = async (app: FastifyInstance) => {
  app.get("/external-services/:monthRange/export", 
  {preHandler: auth}, 
  async (req: FastifyRequest, res: FastifyReply) => {
    try {
      var {monthRange } = req.params as {monthRange: string};

      monthRange = moment(monthRange,"dd-MM-YYYY").format()
      const month = moment(monthRange,"YYYY-MM-dd").format("MM/YYYY");

      const { data, error } = await supabase
      .from("externalServices")
      .select()
      .is("deletedAt", null)
      .gte("date", monthRange)
      .lte("date", moment(monthRange).add(1, "month").format())
      .order("date", {ascending: true})

      const {data: companies, error: companiesError } = await supabase
      .from("externalCompanies")
      .select()

      if (companiesError) {
        throw companiesError
      }

      if (error) {
        throw error
      } 

      if(data && companies) {
        //summary external services data group by company
        let externalServicesData = [] as any;
        let qty = 0;
        let totalValue = 0;

        companies.forEach((company: any) => {
          let qtyByCompany = 0;
          let totalValueByCompany = 0;
          
          data.forEach((element: any) => {
            if (element.companyId === company.id) {
              qtyByCompany += 1;
              qty += 1;
              totalValueByCompany += element.value
              totalValue += element.value
            }
          });
          if(qtyByCompany > 0){
            externalServicesData.push({
              companyName: company.name,
              qty: qtyByCompany,
              totalValue: totalValueByCompany.toFixed(2)
            });
          }
        });

        const rebaseData = data.map((element: any, index) => {
          return {
            ...element,
            companyName: companies.find((company: any) => company.id === element.companyId).name, 
            date: moment(element.date).format('DD/MM/YYYY - HH:mm a'),
            value: element.value.toFixed(2),
            index: index + 1 
          }
        })

        //get template html
        var html = fs.readFileSync("src/templatePdf/templateExternalServices.html", "utf8");
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
  
        //create pdf document 
        var doocument = {
          html: html,
          data: {
            logo,
            summary: {
              qty,
              totalValue: totalValue.toFixed(2)
            },
            summaryData: externalServicesData,
            externalServices: rebaseData,
            month
          },
          path: "./external-services.pdf", //path of pdf file on server
          type:'',
        };
  
        //pdf creation function
        await pdf.create(doocument, options)
        .then((res: any) => {
        })
        .catch((error: any) => {
            throw error;
        });
  
        //create stream and send pdf file
        const stream = fs.createReadStream('external-services.pdf'); 
        res.header('Content-Type', 'application/pdf');
        return res.send(stream).type('application/pdf').code(200);
      }

    } catch (error) {
      res.send({error: error})
    }
  })
}


