import React, { useState } from 'react';
import Modal from './Modal';
import { BiSearch, BiPlus } from 'react-icons/bi';
import { memberData, servicesData, medicineData } from '../Datas';
import { RadioGroup } from '@headlessui/react';
import { Button } from '../Form';

function PatientMedicineServiceModal({ closeModal, isOpen, patient, data, setPatient }) {
  const [selected, setSelected] = useState();
  const datas = patient
    ? memberData
    : // combine medicine and services data and sort by name
    [...servicesData.slice(1, 100), ...medicineData].sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
  const [searchTerm, setSearchTerm] = useState("");

  const handleInclude = () => {
    setPatient(selected);
    closeModal()
  }


  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={'Pacientes'}
      width={'max-w-xl'}
    >
      <div className="flex-colo gap-6">
        {/* search */}
        <div className="flex items-center gap-4 w-full border border-border rounded-lg p-3">
          <input
            type="text"
            placeholder="Pesquise por nome..."
            className="w-full"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <BiSearch className=" text-xl" />

        </div>
        {/* data */}
        <div className="w-full h-[50vh] overflow-y-scroll">
          <RadioGroup >
            <div className="space-y-2">
              {data ? data.filter((user) => {
                if (searchTerm === "") {
                  return user
                } else if (user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return user
                }
              }).map((item, key) => {
                return (
                  <div>
                    <RadioGroup.Option
                      key={item.id}
                      value={item}
                      onClick={() => setSelected(item)}
                      className={({ active, checked }) =>
                        `
                    ${active ? 'border-subMain bg-subMain text-white' : ''}
                    rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white cursor-pointer`
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <h6 className="text-sm">
                            {patient ? item.fullName : item.fullName}
                          </h6>

                        </>
                      )}
                    </RadioGroup.Option>
                  </div>
                )
              })
                : ""}
            </div>
          </RadioGroup>
        </div>
        {/* button */}

        <Button onClick={handleInclude} label="Selecionar" />
      </div>
    </Modal>
  );
}

export default PatientMedicineServiceModal;
