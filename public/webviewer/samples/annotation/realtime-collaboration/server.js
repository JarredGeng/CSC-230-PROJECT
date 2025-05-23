/* global firebase */

/*
Firebase rule

{
  "rules": {
    ".read": "auth != null",
    "documents": {
      "$documentId": {
        "annotations": {
          "$annotationId": {
            ".write": "auth.uid === newData.child('authorId').val() || auth.uid === data.child('authorId').val() || auth.uid === newData.child('parentAuthorId').val() || auth.uid === data.child('parentAuthorId').val()"
          }
        }
      }
    },

    "authors": {
      "$authorId": {
        ".write": "auth.uid === $authorId"
      }
    }
  }
}

*/

(function() {
  /* eslint-disable-next-lin @typescript-eslint/no-unused-vars */
  class Server {
    constructor() {
      // Initialize server
      const firebaseConfig = {
        apiKey: 'AIzaSyAwdfrUvp8ZDE1C8MBJkEHsOoKUPD1XYQ0',
        authDomain: 'semiotic-pager-236719.firebaseapp.com',
        databaseURL: 'https://semiotic-pager-236719-default-rtdb.firebaseio.com',
        projectId: 'semiotic-pager-236719',
        storageBucket: 'semiotic-pager-236719.appspot.com',
        messagingSenderId: '344631752332',
        appId: '1:344631752332:web:84393f3118bde003ab6da9',
        measurementId: 'G-514SYF1EPJ',
      };

      firebase.initializeApp(firebaseConfig);

      // Get references to database locations
      this.authorsRef = firebase
        .database()
        .ref()
        .child('authors');
    }

    // Custom bind function for authorization and data events
    bind(action, callbackFunction) {
      switch (action) {
        case 'onAuthStateChanged':
          firebase.auth().onAuthStateChanged(callbackFunction);
          break;
        case 'onAnnotationCreated':
          this.annotationsRef.on('child_added', callbackFunction);
          break;
        case 'onAnnotationUpdated':
          this.annotationsRef.on('child_changed', callbackFunction);
          break;
        case 'onAnnotationDeleted':
          this.annotationsRef.on('child_removed', callbackFunction);
          break;
        default:
          console.error('The action is not defined.');
          break;
      }
    }

    selectDocument(documentId) {
      this.documentsRef = firebase
        .database()
        .ref()
        .child('documents')
        .child(documentId);

      this.annotationsRef = this.documentsRef.child('annotations');
    }

    // Check if the author exists and open an appropriate popup
    checkAuthor(authorId, openReturningAuthorPopup, openNewAuthorPopup) {
      this.authorsRef.once('value', authors => {
        if (authors.hasChild(authorId)) {
          this.authorsRef.child(authorId).once('value', author => {
            openReturningAuthorPopup(author.val().authorName);
          });
        } else {
          openNewAuthorPopup();
        }
      });
    }

    // Sign in
    signInAnonymously() {
      firebase
        .auth()
        .signInAnonymously()
        .catch(error => {
          if (error.code === 'auth/operation-not-allowed') {
            alert('You must enable Anonymous auth in the Firebase Console.');
          } else {
            console.error(error);
          }
        });
    }

    // Create/update/delete methods
    createAnnotation(annotationId, annotationData) {
      this.annotationsRef.child(annotationId).set(annotationData);
    }

    updateAnnotation(annotationId, annotationData) {
      this.annotationsRef.child(annotationId).set(annotationData);
    }

    deleteAnnotation(annotationId) {
      this.annotationsRef.child(annotationId).remove();
    }

    updateAuthor(authorId, authorData) {
      this.authorsRef.child(authorId).set(authorData);
    }
  }

  window.Server = Server;
})();
