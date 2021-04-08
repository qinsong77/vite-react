import React, { useState } from 'react'
import UsePullUpLoadMore from '@components/pullUpLoad'

// import UsePullUpLoadMore from '@components/pullUpLoad'
function Table() {
	const [data, setData ] = useState(function () {
		const res = []
		for(let i = 0; i < 100; i ++) {
			res.push({
				id: i + 1,
				date: new Date().toLocaleDateString(),
				text: 'this is test'
			})
		}
		return res
	})
	function addData(data) {
		setData(prevState => [...prevState, ...data])
	}
	function getList() {
		return new Promise(resolve => {
			const res = []
			for(let i = 0; i < 20; i ++) {
				res.push({
					id: data.length + 1 + i,
					date: new Date().toLocaleDateString(),
					text: 'this is test'
				})
			}
			setTimeout(() => {
				resolve(res)
			}, 2000)
		})
	}
	return (
		<div>
			<h2>table</h2>
			<UsePullUpLoadMore getList={getList} addData={addData} height={500}>
				{
					data.map(v => <p key={v.id}> id: { v.id} ----- { v.text + '---' + v.date }</p>)
				}
			</UsePullUpLoadMore>
		</div>
	)
}

export default Table
