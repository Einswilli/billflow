from django.contrib.auth.models import BaseUserManager

####
##      USER MANAGER
#####
class UserManager(BaseUserManager):
    ''' Custom Object Manager for USER Model '''
    
    use_in_migrations = True
    
    def _create_user(self,username, email, password=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        
        # MUST SUPPLY AN EMAIL
        if not email:
            raise ValueError("The Email field must be set")
        
        # MUST SUPPLY A PASSWORD
        if not password:
            raise ValueError("User must have a password!")
        
        email = self.normalize_email(email)
        user = self.model(
            username = username,
            email = email, 
            **extra_fields
        )
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_user(self, username, password, email=None, **extra_fields):
        """Create a user"""
        
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)

        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self,username, email, password=None, **extra_fields):
        """Create a super user"""
        
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        # SUPPER USER MUST BE STAFF
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        
        # SUPPER USER ATTRIBUTE MUST BE TRUE
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, password, email=email, **extra_fields)