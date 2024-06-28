import React, { useState } from 'react';
import Modal from './Modal';
import { BiSearch } from 'react-icons/bi';
import { RadioGroup, Radio, RadioGroupOption } from '@headlessui/react';
import { Button } from '../Form';

function PatientMedicineServiceModal({ closeModal, isOpen, patient, data, setPatient }) {
  const [selected, setSelected] = useState(patient);

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
      width={'max-w-md'}
    >
      <div className="flex-colo gap-6">
        {/* search */}
        <div className="flex items-center gap-2 w-full border border-border rounded-lg p-3">
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
          <RadioGroup
            value={selected}
            onChange={setSelected}
            className="space-y-2 mr-2"
          >
            {data ? data.filter((user) => {
              if (searchTerm === "") {
                return user
              } else if (user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
                return user
              }
            }).map((item, key) => {
              return (
                <Radio
                  key={item.id}
                  value={item}
                  className="group relative flex cursor-pointer rounded-lg bg-white py-4 px-5 text-black border border-border transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-subMain data-[checked]:text-white data-[checked]:shadow-none"
                >
                  <>
                    <h1 className="text-sm">
                      {item.fullName}
                    </h1>

                  </>
                </Radio>
              )
            })
              : ""}
          </RadioGroup>
        </div>
        {/* button */}
        <Button onClick={handleInclude} disabled={selected.id === 0 ? true : false} label="Selecionar" />
      </div>
    </Modal>
  );
}

export default PatientMedicineServiceModal;
