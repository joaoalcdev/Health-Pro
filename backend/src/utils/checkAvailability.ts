import { supabase } from "../supabaseConnection";

async function checkAvailability (professionalId: number, startDate: string, endDate: string){
  let status = false;

  let { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq('professionalId', professionalId)
    .eq('eventStatus', 1);

  if (error) {
    return false;
  }

  if (data?.length != 0 && data != null) {
    let start = Date.parse(startDate);
    let end = Date.parse(endDate);

    for (let i = 0; i < data.length; i++) {
      if (start >= Date.parse(data[i].startTime) && start < Date.parse(data[i].endTime)) {
        status = true;
        break;
      }
      if (end > Date.parse(data[i].startTime) && end < Date.parse(data[i].endTime)) {
        status = true;
        break;
      }
    }
  }
  return status;
}

export default checkAvailability;


