'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Display = function (_React$Component) {
  _inherits(Display, _React$Component);

  function Display(props) {
    _classCallCheck(this, Display);

    return _possibleConstructorReturn(this, _React$Component.call(this, props));
  }

  Display.prototype.render = function render() {
    return React.createElement(
      'div',
      { id: 'lcd' },
      React.createElement(
        'div',
        { id: 'formula' },
        this.props.formula.replace(/x/g, '*')
      ),
      React.createElement(
        'div',
        { id: 'display' },
        this.props.value
      )
    );
  };

  return Display;
}(React.Component);

var Keypad = function (_React$Component2) {
  _inherits(Keypad, _React$Component2);

  function Keypad(props) {
    _classCallCheck(this, Keypad);

    return _possibleConstructorReturn(this, _React$Component2.call(this, props));
  }

  Keypad.prototype.render = function render() {
    return React.createElement(
      'div',
      { id: 'keypad' },
      React.createElement(
        'button',
        { id: 'clear', onClick: this.props.clearHandler },
        'AC'
      ),
      React.createElement(
        'button',
        { id: 'divide', onClick: this.props.operatorHandler,
          value: '/' },
        '/'
      ),
      React.createElement(
        'button',
        { id: 'multiply', onClick: this.props.operatorHandler,
          value: 'x' },
        'x'
      ),
      React.createElement(
        'button',
        { id: 'seven', onClick: this.props.valueHandler,
          value: '7' },
        '7'
      ),
      React.createElement(
        'button',
        { id: 'eight', onClick: this.props.valueHandler,
          value: '8' },
        '8'
      ),
      React.createElement(
        'button',
        { id: 'nine', onClick: this.props.valueHandler,
          value: '9' },
        '9'
      ),
      React.createElement(
        'button',
        { id: 'subtract', onClick: this.props.operatorHandler,
          value: '-' },
        '-'
      ),
      React.createElement(
        'button',
        { id: 'four', onClick: this.props.valueHandler,
          value: '4' },
        '4'
      ),
      React.createElement(
        'button',
        { id: 'five', onClick: this.props.valueHandler,
          value: '5' },
        '5'
      ),
      React.createElement(
        'button',
        { id: 'six', onClick: this.props.valueHandler,
          value: '6' },
        '6'
      ),
      React.createElement(
        'button',
        { id: 'add', onClick: this.props.operatorHandler,
          value: '+' },
        '+'
      ),
      React.createElement(
        'button',
        { id: 'one', onClick: this.props.valueHandler,
          value: '1' },
        '1'
      ),
      React.createElement(
        'button',
        { id: 'two', onClick: this.props.valueHandler,
          value: '2' },
        '2'
      ),
      React.createElement(
        'button',
        { id: 'three', onClick: this.props.valueHandler,
          value: '3' },
        '3'
      ),
      React.createElement(
        'button',
        { id: 'equals', onClick: this.props.resultHandler,
          value: '=' },
        '='
      ),
      React.createElement(
        'button',
        { id: 'zero', onClick: this.props.valueHandler,
          value: '0' },
        '0'
      ),
      React.createElement(
        'button',
        { id: 'decimal', onClick: this.props.decimalHandler,
          value: '.' },
        React.createElement(
          'strong',
          null,
          '.'
        )
      )
    );
  };

  return Keypad;
}(React.Component);

var beginsWithOperator = /^[x\+\-\/\*]/,
    hasOperator = /[x\+\-\/\*]/,
    endsWithOperator = /[x\+\-\/\*]$/;

var Calculator = function (_React$Component3) {
  _inherits(Calculator, _React$Component3);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = {
      value: '0',
      formula: '',
      result: ''
    };
    _this3.handleClickNumber = _this3.handleClickNumber.bind(_this3);
    _this3.handleClickClear = _this3.handleClickClear.bind(_this3);
    _this3.handleClickOperator = _this3.handleClickOperator.bind(_this3);
    _this3.handleClickDecimal = _this3.handleClickDecimal.bind(_this3);
    _this3.handleClickResult = _this3.handleClickResult.bind(_this3);
    return _this3;
  }

  Calculator.prototype.handleClickClear = function handleClickClear(event) {
    this.setState({ value: '0', formula: '', result: '' });
  };

  Calculator.prototype.handleClickNumber = function handleClickNumber(event) {

    var currVal = this.state.value;
    var currFormula = this.state.formula;
    var result = this.state.result;
    var numInput = event.target.value;

    if (currVal === '0' || result === currVal) {
      this.setState({
        value: numInput,
        formula: numInput === '0' ? '' : numInput,
        result: ''
      });
    } else {
      // TODOS right here with number limits
      if (currVal.length === 25) {
        alert('max limit reached');
      } else if (!beginsWithOperator.test(currVal)) {
        this.setState({
          value: currVal += numInput,
          formula: currFormula += numInput
        });
      } else {
        this.setState({
          value: numInput,
          formula: currFormula += numInput
        });
      }
    }
  };

  Calculator.prototype.handleClickOperator = function handleClickOperator(event) {

    var currVal = this.state.value;
    var currFormula = this.state.formula;
    var operatorInput = event.target.value;

    var hasResult = /=/.test(currFormula);

    if (currVal !== '0' && !/^[x\/\+]/.test(currVal) && !/[\.]$/.test(currVal)) {
      this.setState({
        value: operatorInput
      });

      if (!endsWithOperator.test(currFormula)) {
        this.setState({
          formula: hasResult ? this.state.result += operatorInput : currFormula += operatorInput
        });
      }
    }

    if (endsWithOperator.test(currFormula)) {
      currFormula = currFormula.slice(0, -1);
      this.setState({
        value: operatorInput,
        formula: currFormula += operatorInput
      });
    }
  }; // end handleClickOperator

  Calculator.prototype.handleClickDecimal = function handleClickDecimal() {
    var currVal = this.state.value;
    var currFormula = this.state.formula;
    var endsWithOp = endsWithOperator.test(currFormula);
    var hasResult = currVal === this.state.result;

    if (!/\./.test(currVal)) {

      if (currVal === '0') {
        this.setState({
          value: hasOperator.test(currVal) ? '0.' : currVal += '.',
          formula: endsWithOp ? currFormula += '.' : currFormula += '0.'
        });
      } else {
        this.setState({
          value: hasOperator.test(currVal) ? '0.' : currVal += '.',
          formula: endsWithOp ? currFormula += '0.' : currFormula += '.'
        });
      }
    }
  };

  Calculator.prototype.handleClickResult = function handleClickResult() {
    var currVal = this.state.value;
    var currFormula = this.state.formula.replace(/x/g, '*');
    var endsWithOp = endsWithOperator.test(currFormula);
    var hasResult = currVal === this.state.result;
    var endsWithDot = /[\.]$/.test(currVal);

    if (currVal !== '0' && !endsWithOp && !endsWithDot && !hasResult) {
      var result = eval(currFormula);
      this.setState({
        value: result,
        formula: currFormula += '=' + result,
        result: result
      });
    }
  };

  Calculator.prototype.render = function render() {
    return React.createElement(
      'div',
      { id: 'calculator' },
      React.createElement(Display, { value: this.state.value,
        formula: this.state.formula
      }),
      React.createElement(Keypad, { valueHandler: this.handleClickNumber,
        clearHandler: this.handleClickClear,
        operatorHandler: this.handleClickOperator,
        decimalHandler: this.handleClickDecimal,
        resultHandler: this.handleClickResult
      })
    );
  };

  return Calculator;
}(React.Component);

ReactDOM.render(React.createElement(Calculator, null), document.getElementById('root'));