import { useCallback, useMemo, useState, type FormEvent } from 'react'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
] as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldRadius = 'rounded-2xl'

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isWeekend(d: Date): boolean {
  const day = d.getDay()
  return day === 0 || day === 6
}

function monthLabel(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })
}

function buildCalendarDays(viewYear: number, viewMonth: number): (Date | null)[] {
  const first = new Date(viewYear, viewMonth, 1)
  const startPad = (first.getDay() + 6) % 7
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells: (Date | null)[] = []

  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(viewYear, viewMonth, d))
  }
  return cells
}

function validateEmail(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Email is required'
  if (!EMAIL_RE.test(trimmed)) return 'Enter a valid email address'
  return null
}

type FooterBookingProps = {
  onSubmit?: (payload: {
    email: string
    date: Date
    time: string
  }) => void
}

export default function FooterBooking({ onSubmit }: FooterBookingProps) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)

  const canGoPrevMonth =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth())

  const calendarDays = useMemo(
    () => buildCalendarDays(viewYear, viewMonth),
    [viewYear, viewMonth],
  )

  const emailValid = email.trim() !== '' && EMAIL_RE.test(email.trim())

  const goPrevMonth = useCallback(() => {
    if (!canGoPrevMonth) return
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
    setSelectedDate(null)
    setSelectedTime(null)
  }, [canGoPrevMonth, viewMonth])

  const goNextMonth = useCallback(() => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
    setSelectedDate(null)
    setSelectedTime(null)
  }, [viewMonth])

  const selectDay = useCallback(
    (day: Date) => {
      const d = startOfDay(day)
      if (d < today) return
      if (isWeekend(d)) return
      setSelectedDate(d)
      setSelectedTime(null)
    },
    [today],
  )

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value)
    if (emailError) setEmailError(validateEmail(value))
  }, [emailError])

  const handleEmailBlur = useCallback(() => {
    if (email.trim()) setEmailError(validateEmail(email))
  }, [email])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const err = validateEmail(email)
      if (err) {
        setEmailError(err)
        return
      }
      if (!selectedDate || !selectedTime) return
      onSubmit?.({ email: email.trim(), date: selectedDate, time: selectedTime })
    },
    [email, onSubmit, selectedDate, selectedTime],
  )

  return (
    <div id="book" className="flex w-full md:w-[330px] flex-col gap-4 scroll-mt-28">
      <div>
        <h2 className="font-display text-xl font-semibold tracking-tight text-white">
          Book a discovery call
        </h2>
        <p className="mt-1 text-sm text-white/50">
          Pick a weekday and time, we&apos;ll confirm by email.
        </p>
      </div>

      <div className={`overflow-hidden ${fieldRadius} bg-white/[0.07] p-3`}>
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={goPrevMonth}
            disabled={!canGoPrevMonth}
            className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/[0.06] text-white/80 transition hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-25"
            aria-label="Previous month"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className="font-ui text-xs font-medium tracking-wide text-white">
            {monthLabel(viewYear, viewMonth)}
          </p>
          <button
            type="button"
            onClick={goNextMonth}
            className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/[0.06] text-white/80 transition hover:bg-white/12"
            aria-label="Next month"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M6 12l4-4-4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1.5">
          {WEEKDAYS.map((label) => (
            <span
              key={label}
              className="py-0.5 text-center font-ui text-[0.55rem] uppercase tracking-[0.12em] text-white/40"
            >
              {label}
            </span>
          ))}
          {calendarDays.map((day, i) => {
            if (!day) {
              return <span key={`empty-${i}`} className="h-7" />
            }
            const d = startOfDay(day)
            const isPast = d < today
            const weekend = isWeekend(d)
            const disabled = isPast || weekend
            const selected = selectedDate ? isSameDay(d, selectedDate) : false

            let dayClass =
              'flex h-7 w-full items-center justify-center rounded-lg text-xs font-medium transition '
            if (disabled) {
              dayClass += 'cursor-not-allowed text-white/20'
            } else if (selected) {
              dayClass += 'bg-white text-black hover:bg-white'
            } else {
              dayClass += 'text-white/80 hover:bg-white/10'
              if (weekend) dayClass += ' text-white/25'
            }

            return (
              <button
                key={d.toISOString()}
                type="button"
                disabled={disabled}
                onClick={() => selectDay(d)}
                className={dayClass}
              >
                {d.getDate()}
              </button>
            )
          })}
        </div>

       
          <div className="mt-3 pt-3">
           
            <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {TIME_SLOTS.map((slot) => {
                const active = selectedTime === slot
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={
                      active
                        ? 'rounded-lg bg-white px-1 py-2 text-center text-[0.65rem] font-medium text-black transition'
                        : 'rounded-lg bg-white/[0.08] px-1 py-2 text-center text-[0.65rem] font-medium text-white/75 transition hover:bg-white/10'
                    }
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
          </div>
    
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-start md:items-center">
        <div className="min-w-0 flex-1">
          <label className="sr-only" htmlFor="footer-booking-email">
            Email
          </label>
          <input
            id="footer-booking-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={handleEmailBlur}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? 'footer-booking-email-error' : undefined}
            className={`w-full rounded-lg bg-white/[0.07] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:bg-white/[0.09] ${
              emailError ? 'ring-1 ring-red-400/80' : ''
            }`}
          />
          {emailError ? (
            <p
              id="footer-booking-email-error"
              className="mt-1.5 text-xs text-red-400/90"
              role="alert"
            >
              {emailError}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={!selectedDate || !selectedTime || !emailValid}
          className={`shrink-0 rounded-lg bg-white px-3 py-2.5 font-ui text-[0.6rem] font-semibold tracking-loose text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40`}
        >
          BOOK NOW
        </button>
      </form>
    </div>
  )
}
