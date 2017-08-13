## prop-types application
prop-types就是对react组件中props对象中的变量进行类型检测，因为props时react数据流的管道，我们通过prop-types就可以轻松监控react里大多数据的变量类型。
通过下面的写法对你的某一个组件的props中的变量进行类型检测:
```
yourComponent.propTypes = {
	pro1: type1,
	pro2: type2
}
```

e.x:

```
import React from 'react'
class Son extends React.COponent{

	render(){
		return (<div style = {{padding:30}}>
			{this.props.number}
			<br/>
			{this.props.array}
			<br/>
			{this.props.boolean.toString()}
			</div>)
	}
}

Son.propTypes = {
	number:PropTypes.oneOfType{
		[PropTypes.string, PropTypes.number]
	}
	number:PropTypes.number,
	array:PropTypes.array,
	boolean:PropTypes.bool
}

class Father extends Reaact.Component {
	render() {
		return (<Son
			number = {'1'}
			array = {'[1,2,3]'}
			boolean = {'true'}
			/>)
	}
}
```

将PropTypes的属性写成函数
```
Son.propTypes = {
	prop: function(props, propName, componentName){
		if (something) {
			return new Error()
		}
	}
}
```
在属性prop的类型检测中，属性值是一个函数，在这里props是包含prop的props对象，propName是prop的属性名，componentName是iprops所在的最近俺名称， 
