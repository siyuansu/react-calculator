import { useState } from 'react'
import Wrapper from './components/Wrapper'
import Screen from './components/Screen'
import ButtonBox from './components/ButtonBox'
import Button from './components/Button'

const btnsA = new Set(['AC', 'C', '+/-', '%'])
const btnsB = new Set(['/', 'x', '-', '+', '='])
const btnValue =  [
	'C', '+/-', '%', '/', 
	7, 8, 9, 'x', 
	4, 5, 6, '-', 
	1, 2, 3, '+', 
	0, '.', '='
]

const App = () => {
	let [calc, setCalc] = useState(
		{
			sign: '',
			num: 0,
			res: 0,
			clear: 'AC', 
			input: true
		}
	)

	const resetHandler = (e) => {
		e.preventDefault()
		setCalc({
			...calc,
			sign: '',
			num: 0,
			res: 0
		})
		console.log('reset')
	}

	const clearHandler = (e) => {
		e.preventDefault()
		setCalc({
			...calc,
			sign: '',
			num: 0,
			clear: 'AC',
			input: false
		})
		console.log('clear screen')
	}

	const invertHandler = (e) => {
		e.preventDefault()
		if ( calc.num || calc.res ) {
			setCalc({
				...calc,
				num: calc.input? -calc.num:calc.num ,
				res: !calc.input? -calc.res:calc.res ,
			})
		}
		console.log('invert')
	}

	const percentHandler = () => {
		// console.log('percent')
		if(calc.res == 'Not a number') {
			console.log('The result is not an number')
			return
		}
		calc.input
		?setCalc({...calc,num: parseFloat(calc.num)/100})
		:setCalc({...calc,res: parseFloat(calc.res)/100}) 
	}

	const signHandler = (e) => {
		e.preventDefault()
		const value = e.target.innerHTML
		if(calc.res == 'Not a number') {
			console.log('The result is not an number')
			return
		}
		let res = Number(calc.res)
		let sign = calc.sign
		if( calc.res===0) {
			setCalc({
				...calc,
				sign: value,
				num: 0,
				res: calc.num,
				input: false
			})
		} else if ( calc.input && sign !== '') {
			let num = Number(calc.num)
			res = sign === '/' && calc.num !== 0
			? res / num
			: sign === '/' && calc.num === 0
			? 'Not a number'
			: sign === 'x'
			? res * num
			: sign === '-'
			? res - num
			: sign === '+'
			? res + num
			: res
			setCalc({
				...calc,
				sign: value,
				res: res,
				input: false
			})
		} else if ( !calc.input ) {
			setCalc({
				...calc,
				sign: value,
				num: res,
				input: false
			})
		}
		
		console.log('sign')
	}

	const equalsHandler = (e) => {
		e.preventDefault()
		if(calc.res == 'Not a number') {
			console.log('The result is not an number')
			return
		}

		let sign = calc.sign
		if ( calc.sign !== '') {
			let res = Number(calc.res)
			let num = Number(calc.num)
			res = sign === '/' && calc.num !== 0
			? res / num
			: sign === '/' && calc.num === 0
			? 'Not a number'
			: sign === 'x'
			? res * num
			: sign === '-'
			? res - num
			: sign === '+'
			? res + num
			: res
			setCalc({
				...calc,
				res: res,
				input: false
			})
		}
		console.log('equals')
	}

	const commaHandler = (e) => {
		e.preventDefault()
		const value = e.target.innerHTML
		if ( !calc.num.toString().includes(value)) {
			setCalc({
				...calc,
				num: calc.num + value
			})
		}
		console.log('comma')
	}

	const numHandler = (e) => {
		e.preventDefault()
		const value = e.target.innerHTML
		if (calc.num.toString().length < 16) {
			let baseNum = !calc.input ? 0 : calc.num
			setCalc({
				...calc,
				num: 
					baseNum.toString().includes('.') && value === "0"
					? baseNum + value
					: baseNum === 0
					? Number(baseNum+value)
					: baseNum + value,
				clear: 'C',
				input: true
			})
		}
		// console.log(calc.num)
	}
  return (
    <div className="App">
			{
				//test area to be deleted
			// console.log(calc)
			}
			<Wrapper>
				<Screen value={
					calc.input? calc.num:calc.res 
					}/>
				<ButtonBox>
					{btnValue.map(
						(btn, i) => {
							return (
							<Button 
								value={
									btn !== 'C'
									? btn
									: calc.clear
								} 
								key={i} 
								className={
									btnsA.has(btn)? "btnA":(
										btnsB.has(btn)? "btnB":(
											btn===0? "btnC, zero":"btnC"
										)
									)
								} 
								onClick={
									btn === 'C' && calc.clear === 'AC'
									? resetHandler
									: btn === 'C' && calc.clear === 'C'
									? clearHandler
									: btn === '+/-'
									? invertHandler
									: btn === '%'
									? percentHandler
									: btn === '.'
									? commaHandler
									: btn === '/' || btn === 'x' || btn === '-' || btn === '+'
									? signHandler
									: btn === '='
									? equalsHandler
									: numHandler
								}
							/>)
						}
					)}
				</ButtonBox>
			</Wrapper>
    </div>
  );
}

export default App;
