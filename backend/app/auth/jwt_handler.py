from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database.database import get_db
from app.services.user_service import get_user_by_email

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
    )

    print("\n" + "=" * 70)
    print("AUTHENTICATION REQUEST")
    print("=" * 70)
    print("TOKEN RECEIVED:")
    print(token)
    print("=" * 70)

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )

        print("JWT PAYLOAD:")
        print(payload)

        email = payload.get("sub")
        print("EMAIL FROM TOKEN:", email)

        if email is None:
            print("ERROR: 'sub' claim is missing from JWT")
            raise credentials_exception

    except JWTError as e:
        print("\nJWT DECODE ERROR")
        print(type(e).__name__)
        print(str(e))
        print("=" * 70)
        raise credentials_exception

    except Exception as e:
        print("\nUNEXPECTED ERROR DURING JWT VALIDATION")
        print(type(e).__name__)
        print(str(e))
        print("=" * 70)
        raise credentials_exception

    user = get_user_by_email(db, email)

    print("\nDATABASE LOOKUP")
    print("Email:", email)
    print("User Found:", user)

    if user is None:
        print("ERROR: User does not exist in database")
        print("=" * 70)
        raise credentials_exception

    print("AUTHENTICATION SUCCESSFUL")
    print("=" * 70 + "\n")

    return user
