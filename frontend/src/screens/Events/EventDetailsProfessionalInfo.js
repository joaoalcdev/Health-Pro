import UsedView from "../../screens/UsedView";
import SubComponent from "../../screens/UsedView";
import { BiChevronDown } from 'react-icons/bi';

function EventDetailsProfessionalInfo({ data, onStatus }) {


  return (
    <>
      <p>
        Dados do professional aqui
      </p>
      {/* <UsedView
        title="Dados do paciente"
        color={true}
        icon={<BiChevronDown className="size-6 text-subMain group-data-[hover]:fill-subMain" />}
        component2={
          <SubComponent 
          subTitle={`Nome: ${data.professionalFirstName} ${data.professionalLastName}`} 
          color={true}></SubComponent>
        }
      >
      </UsedView> */}
    </>
  );
}

export default EventDetailsProfessionalInfo;