import { useState, useRef, useEffect } from 'react';
import './BookingWidget.css';

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg width="17" height="14" viewBox="0 0 17 14" fill="none" aria-hidden="true">
      <path
        d="M16.5 7H1M16.5 7L10.5 1M16.5 7L10.5 13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
      <path d="M6 1.5L3 4.5L6 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
      <path d="M3 1.5L6 4.5L3 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

/* ─────────────────────────────────────────
   BOOKING FIELD
───────────────────────────────────────── */

function BookingField({ label, value, placeholder, isActive, onClick, fieldId }) {
  return (
    <button
      className={`bw-field${isActive ? ' bw-field--active' : ''}`}
      onClick={onClick}
      aria-expanded={isActive}
      aria-haspopup="true"
      aria-controls={`bw-panel-${fieldId}`}
      type="button"
    >
      <span className="bw-field__label">{label}</span>
      <span className={`bw-field__value${!value ? ' bw-field__value--placeholder' : ''}`}>
        {value || placeholder}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────
   DESTINATION DROPDOWN
───────────────────────────────────────── */

const RECENT_SEARCHES = ['Bali, Indonesia', 'Santorini, Greece'];
const SUGGESTED = [
  'Kyoto, Japan',
  'Amalfi Coast, Italy',
  'Patagonia, Argentina',
  'Marrakech, Morocco',
  'Maldives',
  'Cape Town, South Africa',
];

function DestinationDropdown({ id, value, onSelect }) {
  return (
    <div
      className="bw-panel bw-panel--destination"
      id={id}
      role="listbox"
      aria-label="Select destination"
    >
      <div className="bw-panel__section">
        <span className="bw-panel__section-label">Recent</span>
        {RECENT_SEARCHES.map((place) => (
          <button
            key={place}
            className={`bw-panel__item${value === place ? ' bw-panel__item--selected' : ''}`}
            onClick={() => onSelect(place)}
            role="option"
            aria-selected={value === place}
            type="button"
          >
            <span className="bw-panel__item-icon bw-panel__item-icon--recent" aria-hidden="true">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1.5A4 4 0 1 0 9.5 5.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                <path d="M5.5 3.5V5.5L6.5 6.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                <path d="M8 1H9.5V2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
            </span>
            {place}
          </button>
        ))}
      </div>
      <div className="bw-panel__section">
        <span className="bw-panel__section-label">Suggested</span>
        {SUGGESTED.map((place) => (
          <button
            key={place}
            className={`bw-panel__item${value === place ? ' bw-panel__item--selected' : ''}`}
            onClick={() => onSelect(place)}
            role="option"
            aria-selected={value === place}
            type="button"
          >
            <span className="bw-panel__item-icon" aria-hidden="true">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <circle cx="5.5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M5.5 1V2M5.5 7V9.5M5.5 9.5L4 8M5.5 9.5L7 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
            </span>
            {place}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   DATE PICKER
───────────────────────────────────────── */

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAY_NAMES = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function isSameDay(a, b) {
  return a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isPastDay(date, today) {
  return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function DatePickerPanel({ id, startDate, endDate, onSelect, onClear }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  return (
    <div className="bw-panel bw-panel--dates" id={id} role="dialog" aria-label="Select dates">
      <div className="bw-cal__header">
        <button className="bw-cal__nav" onClick={prevMonth} aria-label="Previous month" type="button">
          <ChevronLeft />
        </button>
        <span className="bw-cal__month">{MONTHS[viewMonth]} {viewYear}</span>
        <button className="bw-cal__nav" onClick={nextMonth} aria-label="Next month" type="button">
          <ChevronRight />
        </button>
      </div>

      <div className="bw-cal__days-header" aria-hidden="true">
        {DAY_NAMES.map(d => <span key={d} className="bw-cal__day-name">{d}</span>)}
      </div>

      <div className="bw-cal__grid" role="grid" aria-label={`${MONTHS[viewMonth]} ${viewYear}`}>
        {Array.from({ length: firstDay }, (_, i) => (
          <span key={`e${i}`} className="bw-cal__cell bw-cal__cell--empty" aria-hidden="true" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const date = new Date(viewYear, viewMonth, day);
          const past = isPastDay(date, today);
          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const inRange = startDate && endDate && date > startDate && date < endDate;

          return (
            <button
              key={day}
              role="gridcell"
              type="button"
              className={[
                'bw-cal__cell',
                past ? 'bw-cal__cell--past' : '',
                isStart ? 'bw-cal__cell--start' : '',
                isEnd ? 'bw-cal__cell--end' : '',
                inRange ? 'bw-cal__cell--range' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => !past && onSelect(date)}
              disabled={past}
              aria-label={date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              aria-pressed={isStart || isEnd || undefined}
            >
              {day}
            </button>
          );
        })}
      </div>

      {(startDate || endDate) && (
        <div className="bw-cal__footer">
          <span className="bw-cal__selection">
            {startDate
              ? startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              : '—'}
            {' – '}
            {endDate
              ? endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              : '—'}
          </span>
          <button className="bw-cal__clear" onClick={onClear} type="button">Clear</button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   GUESTS POPOVER
───────────────────────────────────────── */

function GuestsPopover({ id, adults, childCount, infants, onChange }) {
  const rows = [
    { key: 'adults',    label: 'Adults',   sub: '13 or above', value: adults,     min: 1 },
    { key: 'children',  label: 'Children', sub: 'Ages 2–12',   value: childCount, min: 0 },
    { key: 'infants',   label: 'Infants',  sub: 'Under 2',     value: infants,    min: 0 },
  ];

  return (
    <div className="bw-panel bw-panel--guests" id={id} role="dialog" aria-label="Select guests">
      {rows.map(({ key, label, sub, value, min }) => (
        <div key={key} className="bw-guests__row">
          <div className="bw-guests__info">
            <span className="bw-guests__label">{label}</span>
            <span className="bw-guests__sub">{sub}</span>
          </div>
          <div className="bw-guests__controls" role="group" aria-label={label}>
            <button
              className="bw-guests__btn"
              onClick={() => onChange(key, Math.max(min, value - 1))}
              disabled={value <= min}
              aria-label={`Remove one ${label}`}
              type="button"
            >
              −
            </button>
            <span className="bw-guests__count" aria-live="polite" aria-atomic="true">
              {value}
            </span>
            <button
              className="bw-guests__btn"
              onClick={() => onChange(key, value + 1)}
              aria-label={`Add one ${label}`}
              type="button"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   SUBMIT BUTTON
───────────────────────────────────────── */

function SubmitButton({ onClick }) {
  return (
    <button
      className="bw-submit"
      onClick={onClick}
      aria-label="Search"
      type="button"
    >
      <span className="bw-submit__icon" aria-hidden="true">
        <ArrowIcon />
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────
   BOOKING WIDGET
───────────────────────────────────────── */

export default function BookingWidget() {
  const [activeField, setActiveField] = useState(null);
  const [destination, setDestination]   = useState('');
  const [startDate, setStartDate]       = useState(null);
  const [endDate, setEndDate]           = useState(null);
  const [adults, setAdults]             = useState(1);
  const [childCount, setChildCount]     = useState(0);
  const [infants, setInfants]           = useState(0);

  const widgetRef = useRef(null);

  /* close on outside click */
  useEffect(() => {
    const onDown = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setActiveField(null);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  /* close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActiveField(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const toggle = (field) => setActiveField(prev => prev === field ? null : field);

  const handleDateSelect = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date <= startDate) {
      setStartDate(date);
      setEndDate(null);
    } else {
      setEndDate(date);
    }
  };

  const handleGuestChange = (key, val) => {
    if (key === 'adults')   setAdults(val);
    if (key === 'children') setChildCount(val);
    if (key === 'infants')  setInfants(val);
  };

  /* derived display values */
  const totalGuests = adults + childCount;
  const guestDisplay = totalGuests === 1 && infants === 0
    ? ''
    : totalGuests === 1
      ? '1 guest'
      : `${totalGuests} guests`;

  const dateDisplay = startDate
    ? endDate
      ? `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
      : startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '';

  return (
    <div className="bw-wrapper" ref={widgetRef}>
      <div className="bw-container" role="search" aria-label="Search for travel">

        {/* ── Destination ── */}
        <div className="bw-field-wrap">
          <BookingField
            fieldId="destination"
            label="Destination"
            value={destination}
            placeholder="Select destination"
            isActive={activeField === 'destination'}
            onClick={() => toggle('destination')}
          />
          {activeField === 'destination' && (
            <DestinationDropdown
              id="bw-panel-destination"
              value={destination}
              onSelect={(place) => {
                setDestination(place);
                setActiveField('when');
              }}
            />
          )}
        </div>

        <div className="bw-divider" aria-hidden="true" />

        {/* ── When ── */}
        <div className="bw-field-wrap">
          <BookingField
            fieldId="when"
            label="When"
            value={dateDisplay}
            placeholder="Add dates"
            isActive={activeField === 'when'}
            onClick={() => toggle('when')}
          />
          {activeField === 'when' && (
            <DatePickerPanel
              id="bw-panel-when"
              startDate={startDate}
              endDate={endDate}
              onSelect={handleDateSelect}
              onClear={() => { setStartDate(null); setEndDate(null); }}
            />
          )}
        </div>

        <div className="bw-divider" aria-hidden="true" />

        {/* ── Guests ── */}
        <div className="bw-field-wrap">
          <BookingField
            fieldId="guests"
            label="Guests"
            value={guestDisplay}
            placeholder="One guest"
            isActive={activeField === 'guests'}
            onClick={() => toggle('guests')}
          />
          {activeField === 'guests' && (
            <GuestsPopover
              id="bw-panel-guests"
              adults={adults}
              childCount={childCount}
              infants={infants}
              onChange={handleGuestChange}
            />
          )}
        </div>

        {/* ── Submit ── */}
        <SubmitButton
          onClick={() => {
            setActiveField(null);
            // TODO: hand off { destination, startDate, endDate, adults, childCount, infants } to a search action
          }}
        />
      </div>
    </div>
  );
}
