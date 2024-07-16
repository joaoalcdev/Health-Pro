/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import clsx from 'clsx'
import { Menu, Listbox, Switch } from '@headlessui/react';
import { BiLoaderCircle } from 'react-icons/bi';
import DatePicker from 'react-datepicker';
import { FaCheck } from 'react-icons/fa';
import { specialties, sortsDatas } from './Datas';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';

import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Label, Field, ComboboxButton } from '@headlessui/react'
import { HiCheck } from 'react-icons/hi2';

export function InputFilterSelect({ iconButton, children, label, name, placeholder, color, register, value, onChange, required, maxLength, mask, unmask, autoClear, selectedPerson, setSelectedPerson, datas }) {

  // const [selectedPerson, setSelectedPerson] = useState(sortsDatas.bloodTypeFilter[0]);
  const [query, setQuery] = useState('')

  const filtredData =
    query === ''
      ? datas : datas.filter((person) => { return person.name.toLowerCase().includes(query.toLowerCase()) })

  const handleResetValueInput = () => {
    setSelectedPerson('')
  }

  return (
    <>
      <div className="flex w-full flex-col">
        <Field className={`flex w-full flex-col`}>
          <Label
            className={`${color ? 'text-black text-sm pl-1 pb-0.5 text-sm text-black' : 'text-white font-semibold'} `}
          >
            {label}
          </Label>
        </Field>
        {/* fragment component */}
        <Combobox
          immediate={true}
          value={selectedPerson}
          onChange={setSelectedPerson}
          onClose={() => {
            setQuery('');
          }}
          className='flex w-full'
        >
          {({ activeOption }) => (
            <>
              <div className='flex flex-row justify-center items-center text-center w-full max-h-full'>
                <div className="relative w-full">
                  <ComboboxInput
                    className={clsx(`${color ? 'flex w-full z-50 bg-white transitions text-sm p-4 font-light rounded hover:cursor-pointer caret-subMain border border-border focus:border focus:border-subMain focus:ring-0 focus:cursor-text focus:bg-greyed' : ''} `)}
                    aria-label="Assignee"
                    autoFocus={false}
                    as='input'
                    displayValue={(person) => person?.name}
                    // value={bloodType.name}
                    // onChange={(e) => setEmergencyContact(e.target.value)}
                    onChange={(e) => { setQuery(e.target.value); }}
                    onClick={handleResetValueInput}
                  />
                  <ComboboxButton className="group absolute inset-y-0 right-0 mx-4 rotate-0 data-[open]:rotate-180 transition ease-in-out duration-150">
                    {iconButton}
                  </ComboboxButton>
                </div>
                <ComboboxOptions
                  static={false}
                  unmount={false}
                  portal={true}
                  modal={false}
                  as="ul"
                  anchor="bottom start"
                  className={clsx("w-[calc(var(--input-width))] test-max-w empty:visible",
                    'h-[10rem] py-1 break-normal rounded bg-white px-2 border border-border shadow-lg z-50 ')}
                >
                  {
                    filtredData.length === 0 && (
                      <ComboboxOption value={null} className="flex flex-row justify-center items-center text-center w-full bg-greyed py-2 hover:cursor-not-allowed hover:bg-opacity-75">
                        <div className="text-sm text-black">Nenhum dado encontrado</div>
                      </ComboboxOption>
                    ) || filtredData.map((person) => (
                      <ComboboxOption
                        as="li"
                        disabled={!person.available}
                        key={person.id}
                        value={person}
                        className="text-black hover:text-subMain text-sm flex justify-left items-center text-justify py-1 my-[0.125rem] origin-top transition duration-200 rounded ease-out empty:visible data-[disabled]:opacity-75 data-[disabled]:text-black data-[disabled]:bg-red-100 data-[disabled]:cursor-not-allowed data-[closed]:scale-100 data-[closed]:opacity-0 group flex bg-white data-[selected]:text-white data-[selected]:bg-subMain hover:bg-black hover:bg-opacity-5 hover:cursor-pointer rounded"
                      >
                        <HiCheck className="font-bold text-lg text-white invisible group-data-[selected]:visible ml-2" />
                        {person.name === activeOption?.name ? (
                          <span className="px-1">{person.name}</span>
                        ) : (
                          <span className="px-1">{person.name}</span>
                        )}
                      </ComboboxOption>
                    ))
                  }
                </ComboboxOptions>
              </div>
            </>
          )}
        </Combobox>
      </div>
    </>
  )
}


export function CurrencyInputMask({ label, name, color, placeholder, register, value, required, maxLength, unmask, inputId, onValueChange, mode, currency, locale, inputStyle, unstyled, maxFractionDigits, allowEmpty, inputClassName }) {
  return (
    <div className="text-sm w-full">
      <label
        className={`${color ? 'text-black text-sm' : 'text-white font-semibold'
          } `}
      >
        {label}
      </label>
      <InputNumber
        name={name}
        placeholder={placeholder}
        inputStyle={inputStyle}
        unstyled={unstyled}
        {...register}
        value={value}
        onValueChange={onValueChange}
        required={required}
        maxLength={maxLength}
        inputId={inputId}
        unmask={unmask}
        mode={mode}
        currency={currency}
        locale={locale}
        maxFractionDigits={maxFractionDigits}
        allowEmpty={allowEmpty}
        inputClassName={inputClassName}
      />
    </div>
  );
}

export function InputMaskComp({ label, name, type, color, placeholder, register, value, onChange, required, maxLength, mask, unmask, autoClear }) {
  return (
    <div className="text-sm w-full">
      <Field className={`flex w-full flex-col`}>
        <Label
          className={`${color ? 'text-black text-sm pl-1 pb-0.5 text-sm text-black' : 'text-white font-semibold'
            } `}
        >
          {label}
        </Label>
      </Field>
      <InputMask
        name={name}
        required={required}
        maxLength={maxLength}
        onChange={onChange}
        unmask={unmask}
        autoClear={autoClear}
        {...register}
        type={type}
        value={value}
        mask={mask}
        placeholder={placeholder}
        className={`w-full bg-white transitions text-sm p-4 border ${color ? 'border-border font-light' : 'border-white text-white'
          } rounded focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
      />
    </div>
  );
}


export function Input({ label, name, type, color, placeholder, register, value, onChange, required, maxLength, disabled, autoComplete, cursor, max }) {
  return (
    <div className="text-sm w-full">
      <Field className={`flex w-full flex-col`}>
        <Label
          className={`${color ? 'select-none text-black text-sm pl-1 pb-0.5 text-sm text-black' : 'text-white font-semibold'
            } `}
        >
          {label}
        </Label>
      </Field>
      <input
        name={name}
        autoComplete={autoComplete}
        required={required}
        maxLength={maxLength}
        onChange={onChange}
        max={max}
        {...register}
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full bg-white transitions text-sm p-4 border ${color ? 'border-border font-light' : 'border-white text-white'
          } rounded focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
      />
    </div>
  );
}

// button

export function Button({ label, onClick, loading, Icon, type, disabled, children }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`select-none w-full flex-rows gap-4 transitions ${disabled ? 'opacity-30 hover:cursor-not-allowed' : 'hover:opacity-80'} bg-subMain text-white text-sm font-medium px-2 py-4 rounded`}
    >
      {loading ? (
        <BiLoaderCircle className="animate-spin text-white text-xl" />
      ) : (
        <>
          {label}
          {Icon && <Icon className="text-white text-xl" />}
        </>
      )}
      <span>{children}</span>
    </button>
  );
}

export function OutLinedButton({ label, onClick, loading, Icon, type, disabled }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full flex-rows gap-4 transitions ${disabled ? 'opacity-30 hover:cursor-not-allowed' : 'hover:opacity-80'} border border-subMain  text-subMain text-sm font-medium px-2 py-4 rounded`}
    >
      {loading ? (
        <BiLoaderCircle className="animate-spin text-white text-xl" />
      ) : (
        <>
          {label}
          {Icon && <Icon className="text-white text-xl" />}
        </>
      )}
    </button>
  );
}

export function ButtonNegative({ label, onClick, loading, Icon, type, disabled }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full flex-rows gap-4 transitions ${disabled ? 'opacity-30 hover:cursor-not-allowed' : 'hover:opacity-80'} bg-red-500 bg-opacity-5 text-red-500 border border-red-300 text-sm font-medium px-2 py-4 rounded`}
    >
      {loading ? (
        <BiLoaderCircle className="animate-spin text-red-500 text-2xl" />
      ) : (
        <>
          {label}
          {Icon && <Icon className="text-red-500 text-xl" />}
        </>
      )}
    </button>
  );
}

// select

export function MenuSelect({ children, datas, item: data }) {
  return (
    <div className="text-sm w-full relative">
      <Menu>
        <Menu.Button>{children}</Menu.Button>
        <Menu.Items className="flex flex-col z-50 gap-4 absolute right-0  bg-white rounded shadow-lg py-4 px-6 ring-1 ring-border focus:outline-none">
          {datas.map((item, index) => (
            <button
              onClick={() => item.onClick(data)}
              key={index}
              className={`flex gap-4 items-center hover:text-subMain`}
            >
              {item.icon && <item.icon className="text-md text-subMain" />}
              {item.title}
            </button>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}

// select 2

export function Select({ children, selectedPerson, setSelectedPerson, datas, maxHeigth, label, color }) {
  return (
    <>
      <Field className={`flex w-full flex-col`}>
        <Label
          className={`${color ? 'text-black text-sm pl-1 pb-0.5 text-sm text-black' : 'text-white font-semibold'
            } `}
        >
          {label}
        </Label>
      </Field>
      <div className="flex text-sm relative w-full">
        <div className="w-full">
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            <Listbox.Button className={'w-full'}>{children}</Listbox.Button>
            <Listbox.Options className={`flex flex-col top-14 z-50 absolute left-0 w-full h-auto max-h-${maxHeigth ? maxHeigth : '25'} overflow-y-scroll bg-white rounded shadow-lg py-2 px-2 ring-1 ring-border focus:outline-none`}>
              {
                datas.length > 0 ?
                  datas.map((person) => (
                    <Listbox.Option
                      className={`flex relative cursor-pointer text-sm hover:text-subMain hover:bg-black rounded hover:bg-opacity-5 py-2 px-2`}
                      key={person.id}
                      value={person}
                      disabled={person.unavailable}
                    >
                      {person.name} {person.UF && `(${person.UF})`} {person.type && `(${person.type})`}
                    </Listbox.Option>
                  ))
                  :
                  <div className='h-8 flex text-center items-center justify-center'>
                    <p>
                      Sem opções
                    </p>
                  </div>
              }
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
    </>
  );
}


export function FilterSelect({ children, selectedPerson, setSelectedPerson, datas }) {
  return (
    <div className="text-sm relative w-full ">
      <div className="w-full">
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <Listbox.Button className={'w-full'}>{children}</Listbox.Button>
          <Listbox.Options className="flex flex-col top-14 z-50 absolute left-0 w-full h-[10rem] overflow-y-scroll bg-white rounded shadow-lg py-2 px-2 ring-1 ring-border focus:outline-none">
            <Listbox.Option
              className={`cursor-pointer text-sm hover:text-subMain hover:bg-black rounded hover:bg-opacity-5 py-2 px-2`}
              key={0}
              value={{ id: 0, name: "Todos" }}
            >
              Todos
            </Listbox.Option>
            {datas.map((person) => (
              <Listbox.Option
                className={`cursor-pointer text-xs hover:text-subMain hover:bg-black hover:bg-opacity-5 py-2 px-1`}
                key={person.id}
                value={person}
                disabled={person.unavailable}
              >
                {person.name} {person.UF && `(${person.UF})`} {person.type && `(${person.type})`}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
}

export function SelectProfessional({ children, selectedPerson, setSelectedPerson, datas }) {
  return (
    <div className="text-sm relative w-full ">
      <div className="w-full">
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <Listbox.Button className={'w-full'}>{children}</Listbox.Button>
          <Listbox.Options className="flex flex-col top-14 z-50 absolute left-0 w-full h-[10rem] overflow-y-scroll bg-white rounded shadow-lg py-2 px-2 ring-1 ring-border focus:outline-none">
            {datas.map((person) => (
              <Listbox.Option
                className={`cursor-pointer text-sm hover:text-subMain hover:bg-black rounded hover:bg-opacity-5 py-2 px-2`}
                key={person.id}
                value={person}
                disabled={person.unavailable}
              >
                {person.firstName} {person.lastName} ({specialties.specialty[person.specialty - 1].name})
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
}


// switch

export function Switchi({ checked, onChange }) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${checked ? 'bg-subMain' : 'bg-border'}
        relative inline-flex p-[2px] w-12 cursor-pointer rounded-full transitions`}
    >
      <span
        aria-hidden="true"
        className={`${checked ? 'translate-x-5' : 'translate-x-0'}
          pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg  transitions`}
      />
    </Switch>
  );
}

// textarea

export function Textarea({ label, name, register, placeholder, rows }) {
  return (
    <div className="text-sm w-full">
      <label className={'text-black text-sm'}>{label}</label>
      <textarea
        name={name}
        rows={rows}
        {...register}
        placeholder={placeholder}
        className={`transitions focus:border-subMain w-full bg-transparent text-sm mt-3 p-4 border border-border rounded font-light 
         `}
      />
    </div>
  );
}

// date picker

export function DatePickerComp({ label, startDate, onChange, color, locale, showYearDropdown, scrollableYearDropdown, yearDropdownItemNumber, dateFormat, placeholderText, closeOnScroll, isClearable, children, maxDate }) {
  return (
    <div className="flex flex-col text-sm w-full">
      <Field className={`flex w-full flex-col`}>
        <Label
          className={`${color ? 'text-black text-sm pl-1 pb-0.5 text-sm text-black' : 'text-white font-semibold'
            } `}
        >
          {label}
        </Label>
      </Field>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        color={color}
        closeOnScroll={closeOnScroll}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        showYearDropdown={showYearDropdown}
        scrollableYearDropdown={scrollableYearDropdown}
        yearDropdownItemNumber={yearDropdownItemNumber}
        isClearable={isClearable}
        locale={locale}
        maxDate={maxDate}
        className={`transitions w-full bg-white text-sm p-4 border ${color ? 'border-border font-light' : 'border-white text-white'
          } rounded focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
      >
        <div className=''>
          {children}
        </div>
      </DatePicker>
    </div>
  );
}

export function MultiplesDatePickers({ key, label, startDate, onChange, color, locale, showYearDropdown, scrollableYearDropdown, yearDropdownItemNumber, dateFormat, placeholderText, closeOnScroll, showTimeSelect, highlightWithRanges, minDate, maxDate }) {
  return <DatePickerEvents
    key={key}
    label={label}
    startDate={startDate}
    showTimeSelect={showTimeSelect}
    minDate={minDate}
    maxDate={maxDate}
    color={color}
    dateFormat={dateFormat}
    placeholderText={placeholderText}
    locale={locale}
    onChange={onChange}
    showYearDropdown={showYearDropdown}
    scrollableYearDropdown={scrollableYearDropdown}
    yearDropdownItemNumber={yearDropdownItemNumber}
    closeOnScroll={closeOnScroll}
    highlightWithRanges={highlightWithRanges}
  />
}

export function DatePickerEvents({ label, startDate, onChange, color, locale, showYearDropdown, scrollableYearDropdown, yearDropdownItemNumber, dateFormat, placeholderText, closeOnScroll, showTimeSelect, highlightWithRanges, minDate, maxDate }) {
  return (
    <div className="flex flex-col text-sm w-full">
      <label
        className={`${color ? 'text-black text-sm' : 'text-white font-semibold'
          } `}
      >
        {label}
      </label>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        color={color}
        closeOnScroll={closeOnScroll}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        minDate={minDate}
        maxDate={maxDate}
        showYearDropdown={showYearDropdown}
        showTimeSelect={showTimeSelect}
        highlightDates={highlightWithRanges}
        scrollableYearDropdown={scrollableYearDropdown}
        yearDropdownItemNumber={yearDropdownItemNumber}
        filterTime={date => date.getHours() > 5 && date.getHours() < 11 || date.getHours() > 13 && date.getHours() < 20}
        filterDate={date => date.getDay() !== 0 && date.getDay() !== 6}
        locale={locale}
        fixedHeight
        className={`w-auto bg-white text-xl  py-4 hover:cursor-pointer focus:cursor-text caret-subMain`}
      />
    </div>
  );
}

// time picker

export function TimePickerComp({ label, startDate, onChange, placeholderText }) {
  return (
    <div className="flex flex-col text-sm w-full">
      <label className={'text-black text-sm'}>{label}</label>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        placeholderText={placeholderText}
        //minTime={new Date().setHours(6, 0)}
        //maxTime={new Date().setHours(21, 0)}
        filterTime={date => date.getHours() > 5 && date.getHours() < 20}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="transitions w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded focus:border focus:border-subMain"
      />
    </div>
  );
}

// checkbox

export function Checkbox({ label, name, onChange, checked }) {
  return (
    <div className="text-sm w-full flex flex-row items-center">
      {/* design checkbox */}
      <label className="flex-colo cursor-pointer relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="absolute opacity-0 w-0 h-0"
        />
        <span
          className={` border rounded  w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${checked ? 'border-subMain bg-subMain' : 'border-gray-300 bg-white'
            }`}
        >
          <FaCheck
            className={`text-[10px] ${checked ? 'block text-white' : 'hidden'}`}
          />
        </span>
      </label>

      {label && <p className={'text-black text-xs ml-2'}>{label}</p>}
    </div>
  );
}

// from to date picker

export function FromToDate({ label, startDate, onChange, endDate, bg }) {
  return (
    <div className="text-sm w-full flex flex-col gap-2">
      {label && <label className={'text-black text-sm'}>{label}</label>}
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        className={`transitions w-full ${bg ? bg : 'bg-transparent'
          }  text-xs px-4 h-14 border border-border text-main font-normal rounded focus:border focus:border-subMain`}
      />
    </div>
  );
}
