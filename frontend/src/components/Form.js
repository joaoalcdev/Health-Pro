/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu, Listbox, Switch } from '@headlessui/react';
import { BiLoaderCircle } from 'react-icons/bi';
import DatePicker from 'react-datepicker';
import { FaCheck } from 'react-icons/fa';
import { roleOptions, specialties } from './Datas';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';


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
      <label
        className={`${color ? 'text-black text-sm' : 'text-white font-semibold'
          } `}
      >
        {label}
      </label>
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
        className={`w-full bg-white text-sm mt-3 p-4 border ${color ? 'border-border font-light' : 'border-white text-white'
          } rounded-lg focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
      />
    </div>
  );
}

export function Input({ label, name, type, color, placeholder, register, value, onChange, required, maxLength, disabled, autoComplete, cursor }) {
  return (
    <div className="text-sm w-full">
      <label
        className={`${color ? 'text-black text-sm' : 'text-white font-semibold'
          } `}
      >
        {label}
      </label>
      <input
        name={name}
        autoComplete={autoComplete}
        required={required}
        maxLength={maxLength}
        onChange={onChange}
        {...register}
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full bg-transparent text-sm mt-3 p-4 border ${color ? 'border-border font-light' : 'border-white text-white'
          }  rounded-lg focus:border focus:border-subMain hover:cursor${cursor ? cursor : 'pointer'} focus:cursor-text focus:bg-greyed caret-subMain`}
      />
    </div>
  );
}

// button

export function Button({ label, onClick, loading, Icon, type, disabled }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full flex-rows gap-4 transitions ${disabled ? 'opacity-30 hover:cursor-not-allowed' : 'hover:opacity-80'} bg-subMain text-white text-sm font-medium px-2 py-4 rounded`}
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
        <Menu.Items className="flex flex-col z-50 gap-4 absolute right-0  bg-white rounded-md shadow-lg py-4 px-6 ring-1 ring-border focus:outline-none">
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

export function Select({ children, selectedPerson, setSelectedPerson, datas, maxHeigth }) {
  return (
    <div className="flex text-sm relative w-full ">
      <div className="w-full">
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <Listbox.Button className={'w-full'}>{children}</Listbox.Button>
          <Listbox.Options className={`flex flex-col top-14 z-50 absolute left-0 w-full h-auto max-h-${maxHeigth ? maxHeigth : '25'} overflow-y-scroll bg-white rounded-md shadow-lg py-2 px-2 ring-1 ring-border focus:outline-none`}>
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
          <Listbox.Options className="flex flex-col top-14 z-50 absolute left-0 w-full h-[10rem] overflow-y-scroll bg-white rounded-md shadow-lg py-2 px-2 ring-1 ring-border focus:outline-none">
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
        className={`focus:border-subMain w-full bg-transparent text-sm mt-3 p-4 border border-border rounded font-light 
         `}
      />
    </div>
  );
}

// date picker

export function DatePickerComp({ label, startDate, onChange, color, locale, showYearDropdown, scrollableYearDropdown, yearDropdownItemNumber, dateFormat, placeholderText, closeOnScroll }) {
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
        showYearDropdown={showYearDropdown}
        scrollableYearDropdown={scrollableYearDropdown}
        yearDropdownItemNumber={yearDropdownItemNumber}
        locale={locale}
        className={`w-full bg-white text-sm mt-3 p-4 border ${color ? 'border-border font-light' : 'border-white text-white'
          } rounded-lg focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
      />
    </div>
  );
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
        filterTime={date => date.getHours() > 5 && date.getHours() < 20}
        filterDate={date => date.getDay() !== 0 && date.getDay() !== 6}
        locale={locale}
        className={`w-full bg-white text-xl mt-3 p-4 border ${color ? 'border-border font-light' : 'border-white text-white'
          } rounded-lg focus:border focus:border-subMain focus:ring-0 hover:cursor-pointer focus:cursor-text focus:bg-greyed caret-subMain`}
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
        className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
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
        className={`w-full ${bg ? bg : 'bg-transparent'
          }  text-xs px-4 h-14 border border-border text-main font-normal rounded-lg focus:border focus:border-subMain`}
      />
    </div>
  );
}
