import registers from './registers/index'

export default registers.map(r => r.reducer).toJS();
