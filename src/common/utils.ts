import dayJs from 'dayjs'

export const formatDate = (date, template = 'YYYY-MM-DD HH:mm:ss') => {
	if (!date) return date
	return dayJs(date, template)
}
export const debounce = () => {

}

export const validateFile = (file: File) => {
}
