/**
 * This shows an example of a common "Contact Us" form in a popup window. The form uses
 * vbox and hbox layouts to achieve a uniform flexible layout  even when the window is
 * resized.
 *
 * Note that Tab based navigation within the modal window is confined to within the window.
 */
Ext.define('KitchenSink.view.form.ContactForm', {
    extend: 'Ext.form.Panel',
    xtype: 'form-contact',
    controller: 'form-contact',

    title: 'Contact Us',
    width: 500,
    bodyPadding: 20,

    items: [{
        margin: '0 0 20 0',
        xtype: 'component',
        html: [
            'Thank you for visiting our site! We welcome your feedback; ',
            'please click the button below to send us a message. We will ',
            'respond to your inquiry as quickly as possible.'
        ]
    }, {
        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        items: [{
            xtype: 'button',
            cls: 'contactBtn',
            scale: 'large',
            text: 'Contact Us',
            handler: 'showWindow'
        }]
    }]
});

Ext.define('KitchenSink.view.form.ContactFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.form-contact',

    showWindow: function() {
        var win = this.lookupReference('popupWindow');
        console.info(win);
        console.info("showWindow");

        if (!win) {
            win = new KitchenSink.view.form.ContactFormWindow();

            // A Window is a floating component, so by default it is not connected
            // to our main View in any way. By adding it, we are creating this link
            // and allow the window to be controlled by the main ViewController,
            // as well as be destroyed automatically along with the main View.
            this.getView().add(win);
        }

        win.show();
    },

    onFormCancel: function() {
        this.lookupReference('windowForm').getForm().reset();
        this.lookupReference('popupWindow').hide();
    },

    onFormSubmit: function() {
        var formPanel = this.lookupReference('windowForm'),
            form = formPanel.getForm();

        if (form.isValid()) {
            // In a real application, this would submit the form to the configured url
            // form.submit();
            form.reset();
            this.lookupReference('popupWindow').hide();
            Ext.MessageBox.alert(
                'Thank you!',
                'Your inquiry has been sent. We will respond as soon as possible.'
            );
        }
    }
});

Ext.define('KitchenSink.view.form.ContactFormWindow', {
    extend: 'Ext.window.Window',
    xtype: 'form-contact-window',

    reference: 'popupWindow',

    title: 'Contact Us',
    width: 400,
    height: 500,
    minWidth: 300,
    minHeight: 380,
    layout: 'fit',
    resizable: true,
    modal: true,
    defaultFocus: 'firstName',
    closeAction: 'hide',

    items: [{
        xtype: 'form',
        reference: 'windowForm',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        bodyPadding: 10,

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            labelStyle: 'font-weight:bold'
        },

        items: [{
            xtype: 'fieldcontainer',
            fieldLabel: 'Your Name',
            labelStyle: 'font-weight:bold;padding:0;',
            layout: 'hbox',
            defaultType: 'textfield',

            fieldDefaults: {
                labelAlign: 'top'
            },

            items: [{
                flex: 1,
                name: 'firstName',
                itemId: 'firstName',
                afterLabelTextTpl: [
                    '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                ],
                fieldLabel: 'First',
                allowBlank: false
            }, {
                width: 30,
                name: 'middleInitial',
                fieldLabel: 'MI',
                margin: '0 0 0 5'
            }, {
                flex: 2,
                name: 'lastName',
                afterLabelTextTpl: [
                    '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                ],
                fieldLabel: 'Last',
                allowBlank: false,
                margin: '0 0 0 5'
            }]
        }, {
            xtype: 'textfield',
            fieldLabel: 'Your Email Address',
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ],
            vtype: 'email',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Subject',
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ],
            allowBlank: false
        }, {
            xtype: 'textareafield',
            fieldLabel: 'Message',
            labelAlign: 'top',
            flex: 1,
            margin: '0',
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ],
            allowBlank: false
        }],

        buttons: [{
            text: 'Cancel',
            handler: 'onFormCancel'
        }, {
            text: 'Send',
            handler: 'onFormSubmit'
        }]
    }]
});

Ext.onReady(function () {
    Ext.create('KitchenSink.view.form.ContactFormController');
    Ext.create('KitchenSink.view.form.ContactFormWindow');
    Ext.create('Ext.Panel',{
        renderTo: Ext.getBody(),
        frame: true,
        title: '表单测试',
        width: 580,
        height: 400,
        layout: 'border',
        items:[
            KitchenSink.view.form.ContactForm
            // KitchenSink.view.form.ContactFormController
            // KitchenSink.view.form.ContactFormWindow
        ]
    })
});