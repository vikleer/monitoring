# ROLES AND PERMISIONS

## ADMIN

```json
{
    "name": "Admin",
    "description": "Admin"
}
```

### ADMIN PERMISSIONS

```json
{
    "action": "read",
    "subject": "Session",
},
{
    "action": "refresh",
    "subject": "Session",
},
{
    "action": "delete",
    "subject": "Session",
},
{
    "action": "read",
    "subject": "User"
},
{
    "action": "create",
    "subject": "Monitoring"
},
{
    "action": "read",
    "subject": "Monitoring"
},
{
    "action": "update",
    "subject": "Monitoring"
},
{
    "action": "delete",
    "subject": "Monitoring"
},
{
    "action": "schedule",
    "subject": "MonitoringSchedule"
},
{
    "action": "unschedule",
    "subject": "MonitoringSchedule"
},
{
    "action": "read",
    "subject": "Degree"
},
{
    "action": "read",
    "subject": "DegreeSubject"
}
```

## USER

```json
{
    "name": "User",
    "description": "User"
}
```

### USER PERMISSIONS

```json
{
    "action": "read",
    "subject": "Session",
    "conditions": {
        "id": "user.id"
    }
},
{
    "action": "refresh",
    "subject": "Session",
    "conditions": {
        "id": "user.id"
    }
},
{
    "action": "delete",
    "subject": "Session",
    "conditions": {
        "id": "user.id"
    }
},
{
    "action": "read",
    "subject": "User",
    "conditions": {
        "id": "user.id"
    }
},
{
    "action": "read",
    "subject": "Monitoring"
},
{
    "action": "schedule",
    "subject": "MonitoringSchedule"
},
{
    "action": "unschedule",
    "subject": "MonitoringSchedule"
},
{
    "action": "read",
    "subject": "Degree"
},
{
    "action": "read",
    "subject": "DegreeSubject"
}
```

## MONITOR

```json
{
    "name": "Monitor",
    "description": "Monitor"
}
```

## MONITOR PERMISSIONS

```json
{
    "action": "create",
    "subject": "Monitoring"
},
{
    "action": "read",
    "subject": "Monitoring"
},
{
    "action": "update",
    "subject": "Monitoring",
    "conditions": {
        "createdBy": "user.id"
    }
},
{
    "action": "delete",
    "subject": "Monitoring",
    "conditions": {
        "createdBy": "user.id"
    }
},
{
    "action": "read",
    "subject": "Degree"
},
{
    "action": "read",
    "subject": "DegreeSubject"
}
```
