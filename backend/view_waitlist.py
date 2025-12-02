import os
from sqlmodel import Session, select, create_engine
from models import WaitlistEntry

# Ensure we connect to the correct database file regardless of CWD
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sqlite_file_name = os.path.join(BASE_DIR, "database.db")
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url)

def view_waitlist():
    with Session(engine) as session:
        statement = select(WaitlistEntry)
        results = session.exec(statement).all()
        
        print(f"\n{'ID':<5} {'Name':<20} {'Email':<30} {'Company':<20} {'Created At'}")
        print("-" * 100)
        
        if not results:
            print("No entries found.")
        
        for entry in results:
            company = entry.company if entry.company else "N/A"
            print(f"{entry.id:<5} {entry.name:<20} {entry.email:<30} {company:<20} {entry.created_at}")
        print("\n")

if __name__ == "__main__":
    view_waitlist()
