import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { supabase } from "../../supabaseConnection";
import moment from 'moment';

const fs = require('fs');
var pdf = require("pdf-creator-node");

export const getPatientRecordsExport = async (app: FastifyInstance) => {
  app.get("/patient/:id/records/:monthRange/export", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      var { id, monthRange } = req.params as { id: string, monthRange: string }
      const month = moment(monthRange,"dd-MM-YYYY").format("MM/YYYY");
      monthRange = moment(monthRange,"dd-MM-YYYY").format();

      //Get patient data
      const { data: patientData, error:patientDataError } = await supabase
        .from('patients')
        .select()
        .eq('id', id)
      
      if(patientDataError){
        throw patientDataError;
      }

      const { data, error } = await supabase
        .from('view_events')
        .select('*')
        .eq('patientId', id)
        .eq('eventStatus', 3)
        .gte('startTime', monthRange)
        .lte('startTime', moment(monthRange).endOf('month').format())
        .order('startTime', { ascending: true })

      if (error ) {
        throw error
      }

      if (data && patientData) {
        const url = 'https://mquovyisjfoocfacuxum.supabase.co/storage/v1/object/public/cedejom/';      
        const rebaseData = data.map((record: any, index) => {
          return {
            ...record,
            checkInSignature: `${url}${record.checkInSignature}`,
            startTime: moment(record.startTime).format('DD/MM/YYYY - HH:mm'),
            index: index + 1	
          }
        })
        const patient = {
          ...patientData[0],
          dateBirth: moment(patientData[0].birthDate).format('DD/MM/YYYY')
        }

       //get template html
       var html = fs.readFileSync("src/templatePdf/templateFrequency.html", "utf8");

       //create pdf options
      var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "25mm",
            contents: `<h1 style="text-align: center; text-transform: uppercase;">Cabeçalho CEDEJOM</h1>`
        },
        footer: {
            height: "10mm",
            contents: {
                first: '',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: ''
            }
          }  
      };

       //create pdf document 
       var doocument = {
        html: html,
        data: {
          patient,
          records: rebaseData,
          month
        },
        path: "./frequency.pdf", //path of pdf file on server
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
       const stream = fs.createReadStream('frequency.pdf'); 
       res.header('Content-Type', 'application/pdf');
       return res.send(stream).type('application/pdf').code(200);
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })

}