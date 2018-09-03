const fakeDatabase = {
	pools: [
		{
			id: '1',
			number: '123-8/15/18',
			name: 'Tether',
			date: 'Tue Jan 01 2019 00:00:00 GMT+0000 (Coordinated Universal Time)',
			comiss: 3,
			author: 'Владислава Константиновна Карамагомедовна-Фазыльоглы'
		},
		{
			id: '2',
			number: '123-8/15/19',
			name: 'Hether',
			date: 'Tue Jan 01 2019 00:00:00 GMT+0000 (Coordinated Universal Time)',
			comiss: 3,
			author: 'Иван Фёдоров'
		},
		{
			id: '3',
			number: '123-8/15/19',
			name: 'Mether',
			date: 'Tue Jan 01 2019 00:00:00 GMT+0000 (Coordinated Universal Time)',
			comiss: 3,
			author: 'Владислава Карамагомедовна-Фазыльоглы'
		},
		{
			id: '4',
			number: '123-8/15/20',
			name: 'Fether',
			date: 'Tue Jan 01 2019 00:00:00 GMT+0000 (Coordinated Universal Time)',
			comiss: 3,
			author: 'Сергей Зверев'
		},
		{
			id: '5',
			number: '123-8/16/44',
			name: 'Ketether',
			date: 'Tue Jan 01 2019 00:00:00 GMT+0000 (Coordinated Universal Time)',
			comiss: 3,
			author: 'Иван Федоров'
		},
		{
			id: '6',
			number: '123-8/16/45',
			name: 'Pethether',
			date: 'Tue Jan 01 2019 00:00:00 GMT+0000 (Coordinated Universal Time)',
			comiss: 3,
			author: 'Иван Федоров'
		}
	]
};

function delayedPromise(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}

//number name author содержит
export const fakeFindPools = (filterStr) => {
	return delayedPromise(500, { 
		filtered: fakeDatabase.pools
	});
}

export const fakeGetPools = () => {
	return delayedPromise(500, { 
		popular: fakeDatabase.pools.slice(0, 2),
		invested: fakeDatabase.pools.slice(2, 4),
		created: fakeDatabase.pools.slice(4, 6)
	});
}
