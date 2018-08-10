Ext.define('Demo.view.FirstPanel', {
    extend : 'Ext.container.Viewport',
    alias : 'widget.viewDailyWeekly',
    id : 'idDailyWeekly',
    items : [
        {
            xtype : 'form',
            layout : 'column',
            // 标题
            title : '日报',
            // 背景是否有圆角
            frame : false,
            // 表单体和表单的举例
            style : 'margin:10px',
            bodyStyle : 'margin-top:10px',
            fieldDefaults : {
                // 表单字段宽度
                labelWidth : 200,
                // 表单字段属性
                labelAlign : 'right'
            },
            items : [
                {
                    layout : 'column',
                    xtype : 'datefield',
                    id : 'paymentDateDaily',
                    name : 'paymentDateDaily',
                    fieldLabel : '日期:',
                    editable : false,
                    allowBlank : false,
                    value : Ext.util.Format.date(Ext.Date.add(
                        new Date(), Ext.Date.MONTH), 'Y-m-d'),
                    format : 'Y-m-d',
                    altFormats : 'Y/m/d|Ymd'
                }, {
                    layout : 'column',
                    xtype : 'textfield',
                    fieldLabel : '总账户余额(单位:亿元):',
                    id : 'balanceRecharge',
                    name : 'balanceRecharge',
                    value : 0,
                    allowBlank : false
                }, {
                    xtype : 'buttongroup',
                    column : 3,
                    bodyStyle : 'margin-top: -5px',
                    style : {
                        border : 0
                    },
                    items : [ {
                        xtype : 'tbspacer',
                        width : 15
                    }, {
                        id : 'identyQueryButtonDaily',
                        text : '提交',
                        handler : paymentSubmitDaily
                    }, {
                        xtype : 'tbspacer',
                        width : 15
                    }, {
                        id : 'resetButtonDaily',
                        text : '重置',
                        handler : paymentResetDaily
                    } ]
                } ],
            renderTo : Ext.getBody()
        },
        {
            xtype : 'form',
            // 标题
            title : '周报',
            // 背景是否有圆角
            frame : false,
            layout : 'column',
            bodyStyle : 'margin-top:10px',
            style : 'margin:10px',
            fieldDefaults : {
                // 表单字段宽度
                labelWidth : 200,
                // 表单字段属性
                labelAlign : 'right'
            },

            items : [
                {
                    layout : 'column',
                    xtype : 'datefield',
                    id : 'paymentDateWeeklyOne',
                    name : 'paymentDateWeeklyOne',
                    fieldLabel : '日期:',
                    editable : false,
                    allowBlank : false,
                    value : Ext.util.Format.date(Ext.Date.add(
                        new Date(), Ext.Date.MONTH), 'Y-m-d'),
                    format : 'Y-m-d',
                    altFormats : 'Y/m/d|Ymd'
                }, {
                    layout : 'column',
                    xtype : 'textfield',
                    fieldLabel : '今年累计在线支付笔数(单位:笔):',
                    id : 'payCount',
                    name : 'payCount',
                    value : 0,
                    allowBlank : false
                }, {
                    xtype : 'buttongroup',
                    column : 3,
                    bodyStyle : 'margin-top: -5px;',
                    style : {
                        border : 0
                    },
                    items : [ {
                        xtype : 'tbspacer',
                        width : 15
                    }, {
                        id : 'identyQueryButtonWeeklyOne',
                        text : '提交',
                        handler : paymentSubmitWeeklyOne
                    }, {
                        xtype : 'tbspacer',
                        width : 15
                    }, {
                        id : 'resetButtonWeeklyOne',
                        text : '重置',
                        handler : paymentResetWeeklyOne
                    } ]
                } ],
            renderTo : Ext.getBody()
        },
        {
            xtype : 'form',
            layout : 'column',
            style : 'margin:10px',
            fieldDefaults : {
                // 表单字段宽度
                labelWidth : 200,
                // 表单字段属性
                labelAlign : 'right'
            },
            items : [
                {
                    layout : 'column',
                    xtype : 'datefield',
                    id : 'paymentDateWeeklyTwo',
                    name : 'paymentDateWeeklyTwo',
                    fieldLabel : '日期:',
                    editable : false,
                    allowBlank : false,
                    value : Ext.util.Format.date(Ext.Date.add(
                        new Date(), Ext.Date.MONTH), 'Y-m-d'),
                    format : 'Y-m-d',
                    altFormats : 'Y/m/d|Ymd'
                }, {
                    layout : 'column',
                    xtype : 'textfield',
                    fieldLabel : '今年累计在线支付金额(单位:亿元):',
                    id : 'payMoney',
                    name : 'payMoney',
                    value : 0,
                    allowBlank : false
                }, {
                    xtype : 'buttongroup',
                    column : 3,
                    bodyStyle : 'margin-top: -5px;',
                    style : {
                        border : 0
                    },
                    items : [ {
                        xtype : 'tbspacer',
                        width : 15
                    }, {
                        id : 'identyQueryButtonWeeklyTwo',
                        text : '提交',
                        handler : paymentSubmitWeeklyTwo
                    }, {
                        xtype : 'tbspacer',
                        width : 15
                    }, {
                        id : 'resetButtonWeeklyTwo',
                        text : '重置',
                        handler : paymentResetWeeklyTwo
                    } ]
                } ],
            renderTo : Ext.getBody()
        }  ]
});
function paymentResetDaily() {
    Ext.getCmp('balanceRecharge').setValue(0);
    Ext.getCmp('paymentDateDaily').setValue(
        Ext.util.Format.date(Ext.Date.add(new Date(), Ext.Date.MONTH),
            'Y-m-d'));
}

function paymentSubmitDaily() {

    var str = Ext.getCmp('balanceRecharge').getValue();

    if (Validate(str)) {
        Ext.MessageBox.alert('信息提示', '请输入数字!');
        return;
    };

    var params = {
        'paymentDate' : Ext.util.Format.date(Ext.getCmp('paymentDateDaily')
            .getValue(), 'Y-m-d'),
        'balanceRecharge' : Ext.getCmp('balanceRecharge').getValue(),
        'tatolType' : '0'
    };
    Ext.Ajax.request({
        url : '/payment/dailyWeekLy.do',
        params : params,
        method : 'post',
        timeout : 180000,
        scope : this,
        success : function(data) {
            var text = data.responseText;
            var obj = eval('(' + text + ')');
            var da = obj.data;
            var dad = eval('(' + da + ')');
            if (dad.site == 'success') {
                Ext.MessageBox.alert('信息提示', '提交成功!');
            } else {
                Ext.MessageBox.alert('信息提示', '提交失败!');
            }
        },
        failure : function(data) {
            Ext.MessageBox.alert('信息提示', '未成功提交!');
        }
    });

}

function paymentResetWeeklyOne() {
    Ext.getCmp('payCount').setValue(0);
    Ext.getCmp('paymentDateWeeklyOne').setValue(
        Ext.util.Format.date(Ext.Date.add(new Date(), Ext.Date.MONTH),
            'Y-m-d'));
}

function paymentSubmitWeeklyOne() {
    var str = Ext.getCmp('payCount').getValue();

    if (Validate(str)) {
        Ext.MessageBox.alert('信息提示', '请输入数字!');
        return;
    };

    var params = {
        'paymentDate' : Ext.util.Format.date(Ext.getCmp('paymentDateWeeklyOne')
            .getValue(), 'Y-m-d'),
        'balanceRecharge' : Ext.getCmp('payCount').getValue(),
        'tatolType' : '2'
    };
    Ext.Ajax.request({
        url : '/payment/dailyWeekLy.do',
        params : params,
        method : 'post',
        timeout : 180000,
        scope : this,
        success : function(data) {
            var text = data.responseText;
            var obj = eval('(' + text + ')');
            var da = obj.data;
            var dad = eval('(' + da + ')');
            if (dad.site == 'success') {
                Ext.MessageBox.alert('信息提示', '提交成功!');
            } else {
                Ext.MessageBox.alert('信息提示', '提交失败!');
            }
        },
        failure : function(data) {
            Ext.MessageBox.alert('信息提示', '未成功提交!');
        }
    });
}

function paymentResetWeeklyTwo() {
    Ext.getCmp('payMoney').setValue(0);
    Ext.getCmp('paymentDateWeeklyTwo').setValue(
        Ext.util.Format.date(Ext.Date.add(new Date(), Ext.Date.MONTH),
            'Y-m-d'));
}

function paymentSubmitWeeklyTwo() {
    var str = Ext.getCmp('payMoney').getValue();

    if (Validate(str)) {
        Ext.MessageBox.alert('信息提示', '请输入数字!');
        return;
    };

    var params = {
        'paymentDate' : Ext.util.Format.date(Ext.getCmp('paymentDateWeeklyTwo')
            .getValue(), 'Y-m-d'),
        'balanceRecharge' : Ext.getCmp('payMoney').getValue(),
        'tatolType' : '1'
    };
    Ext.Ajax.request({
        url : '/payment/dailyWeekLy.do',
        params : params,
        method : 'post',
        timeout : 180000,
        scope : this,
        success : function(data) {
            var text = data.responseText;
            var obj = eval('(' + text + ')');
            var da = obj.data;
            var dad = eval('(' + da + ')');
            if (dad.site == 'success') {
                Ext.MessageBox.alert('信息提示', '提交成功!');
            } else {
                Ext.MessageBox.alert('信息提示', '提交失败!');
            }
        },
        failure : function(data) {
            Ext.MessageBox.alert('信息提示', '未成功提交!');
        }
    });
}

function Validate(str) {
    var reg = /^\d+(\.\d+)?$/;
    if (!reg.test(str)) {
        return true;
    } else {
        return false;
    }
}