const locales = {
  en: {
    general: {
      error_api: 'Server connect failed'
    },
    login: {
      title: 'Login to our site',
      help: 'Enter your email and password to log on:',
      signup: 'Sign up',
      forgot_password: 'Forgot password',
      form: {
        signin: 'Sign in!',
        remember: 'Rememeber me',
        input: {
          label: {
            email: 'Email',
            password: 'Password'
          }
        }
      },
      errors: {
        not_found: 'Incorrect email or password'
      }
    },
    signup: {
      title: 'Register',
      help: 'Join to our community now !',
      form: {
        submit: 'Send registration',
        input: {
          label: {
            email: 'Email',
            password: 'Password',
            password_bis: 'Password again'
          }
        }
      },
      bottom_text: 'Already have an account ?'
    },
    forgot_password: {
      title: 'Forgot Password',
      help: 'You can reset your password',
      form: {
        submit: 'Submit reset',
        input: {
          label: {
            email: 'Email'
          }
        }
      }
    },
    users: {
      grid: {
        id: 'Id',
        username: 'Username',
        email: 'Email',
        enabled: 'Enabled',
        locked: 'Locked',
        last_login: 'Last Login',
        first_name: 'First name',
        last_name: 'Last name',
        roles: 'Roles'
      },
      button: {
        add: 'Add a new user',
        delete: 'Delete',
        edit: 'Edit'
      }
    },
    menu: {
      sidebar: {
        home: 'Home',
        settings: {
          root: 'Settings',
          users: 'Users'
        }
      }
    }
  },
  fr: {
    general: {
      error_api: 'Impossible de contacter le serveur'
    },
    login: {
      title: 'Connexion',
      help: 'Entrez votre email et mot de passe:',
      signup: 'Créer un compte',
      forgot_password: 'Mot de passe oublié',
      form: {
        signin: 'Se connecter',
        remember: 'Se souvenir de moi',
        input: {
          label: {
            email: 'Email',
            password: 'Mot de passe'
          }
        }
      },
      errors: {
        not_found: 'Email ou mot de passe incorrect'
      }
    },
    signup: {
      title: 'Création de compte',
      help: 'Rejoignez nous !',
      form: {
        submit: 'Envoyer la demande',
        input: {
          label: {
            email: 'Email',
            password: 'Mot de passe',
            password_bis: 'Mot de passe (vérification)'
          }
        }
      },
      bottom_text: 'Déjà un compte ?'
    },
    forgot_password: {
      title: 'Mot de passe oublié',
      help: 'Vous souhaitez réinitialiser votre mot de passe',
      form: {
        submit: 'Envoyer la demande',
        input: {
          label: {
            email: 'Email'
          }
        }
      }
    },
    users: {
      grid: {
        id: 'Id',
        username: 'Nom d\'utilisateur',
        email: 'Email',
        enabled: 'Activé',
        locked: 'Verrouillé',
        last_login: 'Dernière connexion',
        first_name: 'Prénom',
        last_name: 'Nom',
        roles: 'Roles'
      },
      button: {
        add: 'Ajouter un utilisateur',
        delete: 'Supprimer',
        edit: 'Editer'
      }
    },
    menu: {
      topbar: {
        account: {
          close: 'Se déconnecter'
        }
      },
      sidebar: {
        home: 'Accueil',
        settings: {
          root: 'Configuration',
          users: 'Utilisateurs'
        }
      }
    }
  }
}

export default locales
