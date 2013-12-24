 module.exports = {
  // NOTIFICATION SETTINGS
  // service functions called to produce the given audience

  audiences : {
    'everyone' : {
      method: 'findAllUsers',
      fields: {},
      settings: {}
    },
    'user' : {
      method: 'findUser',
      fields: {
        'userId' : {
          name: 'userId',
          required: true,
          type: 'INTEGER',
          defaultValue: null,
          validation: null
        }
      },
      settings: {}
    },
    'projectOwners' : {
      method: 'findProjectOwners',
      fields: {
        'projectId' : {
          name: 'projectId',
          required: true,
          type: 'INTEGER',
          defaultValue: null,
          validation: null
        }
      },
      settings: {}
    },
    'projectParticipants' : {
      method: 'findProjectParticipants',
      fields: {
        'projectId' : {
          name: 'projectId',
          required: true,
          type: 'INTEGER',
          defaultValue: null,
          validation: null
        }
      },
      settings: {}
    },
    'projectLikers' : {
      method: 'findProjectLikers',
      fields: {
        'projectId' : {
          name: 'projectId',
          required: true,
          type: 'INTEGER',
          defaultValue: null,
          validation: null
        }
      },
      settings: {}
    },
    'projectThreadCommenters' : {
      method: 'findProjectThreadParentCommenters',
      fields: {
        'commentId' : {
          name: 'commentId',
          required: true,
          type: 'INTEGER',
          defaultValue: null,
          validation: null
        }
      },
      settings: {}
    }
  },

  // triggers that generate notifications and their config settings
  triggers : {
    'globalBlast' : {
      audiences: ['everyone'],
      deliveries: ['contactEmail', 'message']
    },
    'directUserEmailRequestFromCard' : {
      audiences: ['user'],
      deliveries: ['contactEmail']
    },
    'projectCommentAdded' : {
      audiences: ['projectOwners', 'projectThreadCommenters'],
      deliveries: ['contactEmail']
    },
    'testAll' : {
      audiences: ['everyone'],
      deliveries: ['contactEmail']
    },
    'testOne' : {
      audiences: ['user'],
      deliveries: ['contactEmail']
    },
    'testOwners' : {
      audiences: ['projectOwners'],
      deliveries: ['contactEmail']
    }
  },

  // Defines delivery vehicles, their respective allowed frequencies, and global frequency settings for each
  deliveries : {

    'contactEmail' : {
      // dataPackages: ['subjectMessage', 'bodyMessage', 'email'],
      // frequencies: ['never', 'immediate', 'daily', 'weekly', 'monthly'],
      preflight: {
        method: 'prepareCommentReplyEmail',
        fields: {
          callerId: {
            name: 'callerId',
            required: true,
            type: 'INTEGER',
            defaultValue: null,
            validation: null
          },
          recipientId: {
            name: 'recipientId',
            required: true,
            type: 'INTEGER',
            defaultValue: null,
            validation: null
          }
        },
        settings: {}
      },
      content: {
        method: 'sendSimpleEmail',
        fields: {
          to: {
            name: 'to',
            required: true,
            type: 'STRING',
            defaultValue: null,
            validation: null
          },
          from: {
            name: 'from',
            required: true,
            type: 'STRING',
            defaultValue: null,
            validation: null
          },
          subject: {
            name: 'subject',
            required: true,
            type: 'STRING',
            defaultValue: null,
            validation: null
          },
          layout: {
            name: 'layout',
            required: false,
            type: 'STRING',
            defaultValue: 'default',
            validation: null
          },
          layoutLocals: {
            name: 'layoutLocals',
            required: false,
            type: 'OBJECT',
            defaultValue: {},
            validation: null
          },
          template: {
            name: 'template',
            required: true,
            type: 'STRING',
            defaultValue: 'default',
            validation: null
          },
          templateLocals: {
            name: 'templateLocals',
            required: false,
            type: 'OBJECT',
            defaultValue: {},
            validation: null
          }
        },
        settings: {
          'globalBlast': {
            frequency: 'immediate'
          },
          'directUserEmailRequestFromCard': {
            frequency: 'immediate'
          },
          'projectCommentAdded': {
            frequency: 'immediate'
          },
          'testAll': {
            frequency: 'never'
          },
          'testOne': {
            frequency: 'immediate'
          },
          'testOwners': {
            frequency: 'immediate'
          }
        }
      }
    },
    'message' : {
      preflight: {
        method: 'passThrough',
        fields: {
          'test' : {
            name: 'test',
            required: true,
            type: 'INTEGER',
            defaultValue: null,
            validation: null
          }
        },
        settings: {}
      },
      content: {
        method: 'sendSimpleMessage',
        fields: {
          'test' : {
            name: 'test',
            required: false,
            type: 'INTEGER',
            defaultValue: null,
            validation: null
          }
        },
        settings: {
          'directUserMessage': {
            frequency: 'immediate'
          }
        }
      }
    }
  },
};
