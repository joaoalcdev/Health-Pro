import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { supabase } from "../../supabaseConnection";
import auth from "../../middlewares/auth";

export const ListPatients = async (app: FastifyInstance) => {
  app.get("/patients/", 
  {preHandler: auth,
    schema: {
      querystring: {
        deleted: { type: 'string' },
        professional: { type: 'string' }
      }
    }
  }, 
  async (req: FastifyRequest, res: FastifyReply) => {
    const { deleted } = req.query as { deleted: string}
    const { professional} = req.query as { professional: string}

    try {
      let query = supabase
        .from("patients")
        .select("*")
        .order("fullName", { ascending: true })

        if (deleted === "true") {
          query = query.not("deletedAt", "is", null)
        }else{
          query = query.filter("deletedAt", "is", null)
        }

        const { data: patients, error: patientsError } = await query

        if (professional) {
          const { data: eventsByProfessional, error: eventsByProfessionalError } = await supabase
            .from("view_events")
            .select("id,patientId, startTime, eventStatus,serviceName")
            .eq("professionalId", professional)
            .eq("eventStatus",1)
            .gte("startTime", new Date().toISOString()) 
            .order("startTime", { ascending: true })

          if (eventsByProfessionalError) {
            throw eventsByProfessionalError
          }
          if(eventsByProfessional && patients){
            const patientsData = patients?.filter((patient: any) => eventsByProfessional.find((event: any) => event.patientId === patient.id))
            const patientsWithNextEvent = patientsData.map((patient: any) => {
              const nextEvent = eventsByProfessional.find((event: any) => {
                if (event.patientId === patient.id) {
                  return event
                }
              })
              return {
                ...patient,
                nextEvent: nextEvent
              }
            })
            return res.send({
              status: 200,
              data: patientsWithNextEvent,
              message: "Patients listed successfully"
            })
          }


        }

        if (patientsError) {
          throw patientsError
        } else {
          return res.send({
            status: 200,
            data: patients,
            message: "Patients listed successfully"
          })
        }




      
    } catch (error) {
      return res.send({
        status: 400,
        message: error,
    })
  }
  })
}