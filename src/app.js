import * as i18n from "./i18n.js";

export function registerApp() {
    let client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '60px' });

    client.on('app.registered', r => appRegistered('app.registered', client, r));
};

function appRegistered(evt, client, context) {
    if (context['context'] != undefined) {
        context = context['context'];
    }
    client.get("currentUser.locale").then((data) => {
        return i18n.processUserLocale(data["currentUser.locale"]);
    }).then((locale) => {
        getAwesome(locale, client, context);
    });
}

function getAwesome(locale, client, context) {
    try {
        if (context.location != 'ticket_sidebar') {
            console.error(i18n.getTranslation(locale, "load_location_error") + context.location);
            return;
        }
        let appInstance = client.instance(context.instanceGuid);

        // These promises are not required in this demo app
        // But I leave them as they _usually_ are valuable
        Promise.all([
            client.metadata(),
            appInstance.get('ticket'),
            client.get('currentUser')
        ]).then((responses) => {
            
            let maxawesome = responses[0].settings['maxawesome'];

            document.getElementById('awesomenessrating').setAttribute('max', maxawesome);
            document.getElementById('maxawesome').innerHTML = maxawesome;
            
        });

    } catch (e) {
        // eat
    }
};

