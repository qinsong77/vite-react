import { useState, useEffect } from 'react'

function useData(getData) {
	const [data, setData] = useState({
		data: [],
		loading: true,
		pagination: {
			current: 1,
			pageSize: 10,
			total: 0
		}
	})
	
	useEffect(() => {
		fetchData()
	}, [])
	
	const fetchData = (pagination = data.pagination) => {
		setData({
			...data,
			loading: true
		})
		delete pagination.total
		getData(pagination)
			.then(res => {
				console.log(res)
				setData({
					pagination: {
						...pagination,
						total: res.data.total
					},
					data: res.data.data,
					loading: false
				})
			})
	}
	
	return [data, fetchData]
}

export default useData
