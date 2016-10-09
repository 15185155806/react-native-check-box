import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight
} from 'react-native'
// 导入图标库
import IconFA from 'react-native-vector-icons/FontAwesome'; // 参考地址: http://fontawesome.io/icons/


export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked,
        }
    }

    /**
     * 定义类属性
     * 作用: 约束调用该组件的时候设置的属性值的类型
     * propTypes是默认写法
     */
    static propTypes = {
        ...View.propTypes,
        leftText: React.PropTypes.string,
        leftTextView: React.PropTypes.element,
        rightText: React.PropTypes.string,
        rightTextStyle: React.PropTypes.object,
        checkedImage: React.PropTypes.element,
        unCheckedImage: React.PropTypes.element,
        onClick: React.PropTypes.func.isRequired,
        isChecked: React.PropTypes.bool,
        isIcon: React.PropTypes.bool,
        iconStyle: React.PropTypes.object,
        checkedIconName: React.PropTypes.string,
        unCheckedIconName: React.PropTypes.string,
    }

    /**
     * 用于设置属性的默认值
     * @type {Object}
     */
    static defaultProps = {
        isChecked: false,
        isIcon: false,
        checkedIconName: 'check-square-o',
        unCheckedIconName: 'square-o',
    }

    /**
     * 渲染左侧控件: 文字或者图标
     */
    _renderLeft() {
        if (this.props.rightText) return this.props.isIcon ? this._renderIcon() : this._renderImage();
        if (this.props.leftTextView)return this.props.leftTextView;
        if (!this.props.leftText)return null;
        return (
            <Text style={styles.leftText}>{this.props.leftText}</Text>
        )
    }

    /**
     * 渲染右侧控件: 文字或者Icon
     */
    _renderRight() {
        if (this.props.leftText) return this._renderImage();
        if (!this.props.rightText)return null;
        return (
            <Text style={this.props.rightTextStyle}>{this.props.rightText}</Text>
        )
    }

    /**
     * 渲染图片组件
     */
    _renderImage() {
        if (this.state.isChecked) {
            return this.props.checkedImage ? this.props.checkedImage : this.genCheckedImage();
        } else {
            return this.props.unCheckedImage ? this.props.unCheckedImage : this.genCheckedImage();
        }
    }

    /**
     * 渲染Icon组件
     */
    _renderIcon() {
        if (this.state.isChecked) {
            return (
                <IconFA name={this.props.checkedIconName} style={this.props.iconStyle}/>
            )
        } else {
            return (
                <IconFA name={this.props.unCheckedIconName} style={this.props.iconStyle}/>
            )
        }
    }

    /**
     * 获取图片资源
     */
    genCheckedImage() {
        var source = this.state.isChecked ? require('./img/ic_check_box.png') : require('./img/ic_check_box_outline_blank.png');

        return (
            <Image source={source}/>
        )
    }

    onClick() {
        this.setState({
            isChecked: !this.state.isChecked
        })
        this.props.onClick();
    }

    render() {
        return (
            <TouchableHighlight
                style={this.props.style}
                onPress={()=>this.onClick()}
                underlayColor='transparent'
            >
                <View style={styles.container}>
                    {this._renderLeft()}
                    {this._renderRight()}
                </View>
            </TouchableHighlight>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftText: {
        flex: 1,
    }
});