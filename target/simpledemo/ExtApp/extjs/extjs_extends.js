///数字控件，显示为0,000,000.00
///可以设定thousandSeparator和decimalSeparator来控制{,},{.}的显示
///设定decimalPrecision来控制小数位
///青格勒 2015-04-30
Ext.define('Ext.form.field.ECNumber', {
    extend: Ext.form.field.Number,
    alias: 'widget.ecnumberfield',
    alternateClassName: ['Ext.form.ECNumberField', 'Ext.form.ECNumber'],
    initComponent: function () {
        var me = this;
        if (me.decimalSeparator === null || me.decimalSeparator === undefined) {
            me.decimalSeparator = Ext.util.Format.decimalSeparator;
        }
        if (me.thousandSeparator === null || me.thousandSeparator === undefined) {
            me.thousandSeparator = Ext.util.Format.thousandSeparator;
        }
        me.callParent();

        me.setMinValue(me.minValue);
        me.setMaxValue(me.maxValue);
    },
    //显示值到真实值
    rawToValue: function (rawValue) {
        var me = this,
            decimalSeparator = me.decimalSeparator,
            thousandSeparator = me.thousandSeparator,
            precision = me.decimalPrecision;
        rawValue = rawValue.replace(thousandSeparator, '').replace(decimalSeparator, '.');
        var value = this.fixPrecision(this.parseValue(rawValue));
        if (value === null) {
            value = rawValue || null;
        }
        return value;
    },
    //真实值到显示值
    valueToRaw: function (value) {
        var me = this,
            decimalSeparator = me.decimalSeparator,
            thousandSeparator = me.thousandSeparator,
            precision = me.decimalPrecision,
            formatstring = '0' + thousandSeparator + '000';
        if (me.allowDecimals && precision > 0) {
            formatstring += decimalSeparator;
            for (i = 1; i <= precision; i++) {
                formatstring += '0';
            }
        }
        value = me.parseValue(value);
        value = me.fixPrecision(value);
        value = Ext.isNumber(value) ? value : parseFloat(value);
        value = isNaN(value) ? '' : Ext.util.Format.number(value, formatstring);
        return value;
    },

    // private
    parseValue: function (value) {
        value = parseFloat(String(value).replace(this.decimalSeparator, '.').replace(this.thousandSeparator, ''));
        return isNaN(value) ? null : value;
    },
    fixPrecision: function (value) {
        var me = this,
            nan = isNaN(value),
            precision = me.decimalPrecision;

        if (nan || !value) {
            return nan ? '' : value;
        } else if (!me.allowDecimals || precision <= 0) {
            precision = 0;
        }

        return parseFloat(Ext.Number.toFixed(parseFloat(value), precision));
    },
    processRawValue: function (rawValue) {
        var rex = new RegExp(this.thousandSeparator, 'gi');
        return rawValue.replace(rex, '');
    },
    getErrors: function (value) {
        var me = this,
            errors = me.callParent(arguments),
            format = Ext.String.format,
            num;

        value = Ext.isDefined(value) ? value : this.processRawValue(this.getRawValue());

        if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
            return errors;
        }

        value = String(value).replace(me.decimalSeparator, '.');

        if (isNaN(value)) {
            errors.push(format(me.nanText, value));
        }

        num = me.parseValue(value);

        if (me.minValue === 0 && num < 0) {
            errors.push(this.negativeText);
        }
        else if (num < me.minValue) {
            errors.push(format(me.minText, me.minValue));
        }

        if (num > me.maxValue) {
            errors.push(format(me.maxText, me.maxValue));
        }


        return errors;
    },
})