const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNotificationOnCreate = functions.firestore
    .document('notifications/{notificationId}')
    .onCreate(async (snapshot, context) => {
        const data = snapshot.data();

        if (!data.title || !data.body) {
            console.log('Eksik veri: Başlık veya mesaj bulunamadı.');
            return null;
        }

        const payload = {
            notification: {
                title: data.title,
                body: data.body,
            },
            data: {
                click_action: "FLUTTER_NOTIFICATION_CLICK",
                id: context.params.notificationId,
                status: "done"
            },
            topic: 'all'
        };

        try {
            const response = await admin.messaging().send(payload);
            console.log('Bildirim başarıyla gönderildi:', response);
            
            return snapshot.ref.update({ 
                status: 'sent', 
                sentAt: admin.firestore.FieldValue.serverTimestamp(),
                messageId: response 
            });
        } catch (error) {
            console.error('Bildirim gönderme hatası:', error);
            return snapshot.ref.update({ 
                status: 'failed', 
                error: error.message 
            });
        }
    });
