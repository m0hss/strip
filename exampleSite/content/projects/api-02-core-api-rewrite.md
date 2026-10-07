---
# Fictional sample project from the Strip design. Example content only.
title: "Core API Rewrite"
callsign: "API-02"
type: "software"
status: "ACTIVE"
date: 2026-10-01
summary: "Migrating legacy REST endpoints to GraphQL."
opened_note: "Opened. Full REST-to-GraphQL migration planned."
amendments:
  - old: "Full schema migration for v1."
    new: "Scope reduced to read-only queries for v1."
    date: 2026-10-05
tags: ["graphql", "hugo"]
---

{{< notam title="EXAMPLE CONTENT" >}}
This is a fictional sample project from the Strip design. Replace it with your own work.
{{< /notam >}}

## OBJECTIVE

The main objective is to retire the legacy REST endpoints behind a single GraphQL schema, so clients ask for exactly the fields they need. {{< amend old="Reads and writes both ship in v1." new="Reads only in v1; mutations follow once the schema settles." date="2026-10-05" >}}

## APPROACH

The schema is derived from the existing resource models rather than written from scratch. Each query runs alongside its REST twin for two weeks before the old route is switched off.

```graphql
type Project {
  id: ID!
  callsign: String!
  status: Status!
}

type Query {
  project(id: ID!): Project
  projects(status: Status): [Project!]!
}
```

> Ship reads first. Hold the mutations until the schema has survived one full release.

{{< notam >}}
Read-only mode in effect. Write endpoints stay on the legacy API until further notice.
{{< /notam >}}

Inline code reads like this: `GET /projects?status=active`
