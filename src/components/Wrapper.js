import './Wrapper.css'

const Wrapper = ({children}) => {
	return (
		<main>
		<div className="wrapper">{children}</div>
		</main>
		)
}

export default Wrapper