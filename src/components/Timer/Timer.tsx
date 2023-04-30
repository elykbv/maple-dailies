import { useTimer } from "react-timer-hook"

interface Props {
    reset: 'daily' | 'weekly'
}

const calculateTime = (reset) => {
    if (reset === 'daily') {
        const tomorrow = new Date()
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
        tomorrow.setUTCHours(0, 0, 0, 0)
        return tomorrow
    }

    const today = new Date()
    const diff = 4 - today.getDay()
    const daysToAdd = diff > 0 ? diff : 7 - diff
    const nextWeek = new Date()
    nextWeek.setUTCDate(nextWeek.getUTCDate() + daysToAdd)
    nextWeek.setUTCHours(0, 0, 0, 0)
    return nextWeek
}

const pad = (input: string, size = 2): string => {
    let str = String(input)
    while (str.length < (size)) str = "0" + str
    return str
}

const Timer: React.FC<Props> = ({ reset }) => {
    const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp: calculateTime(reset), autoStart: true })

    return <>{reset === 'weekly' ? days : ''}:{pad(hours)}:{pad(minutes)}:{pad(seconds)}</>
}

export default Timer
