import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const limit = [
  { id: 1, name: 5 },
  { id: 2, name: 10 },
  { id: 3, name: 25 },
  { id: 4, name: 50 },
  { id: 5, name: 100 },
]

function SelectLimit(props) {
  // dynamic select limit
  const [selectedPerson, setSelectedPerson] = useState(limit[2].name)

  return (
    <div className='bg-subMain'>
      <Listbox value={props.limit} onChange={(e) => {
        props.onLimitChange(e)
        setSelectedPerson(e)
      }}>
        <ListboxButton>
          {selectedPerson}
        </ListboxButton>
        <ListboxOptions anchor="bottom">
          {limit.map((person) => (
            <ListboxOption key={person.id} value={person.name} className="data-[focus]:bg-blue-100">
              {person.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}

export { SelectLimit }