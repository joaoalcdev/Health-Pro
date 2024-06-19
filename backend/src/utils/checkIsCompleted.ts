import { supabase } from "../supabaseConnection";

async function checkIsCompleted(id: string) {
  const { data, error } = await supabase.from("appointments")
    .select()
    .eq("id", id)
    .single()

  if (error) {
    return true
  } else {
    if (data?.eventStatus === 3) {
      return true
    }
    return false
  }
}

export default checkIsCompleted;


