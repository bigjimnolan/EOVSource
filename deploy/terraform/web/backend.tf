terraform {
  cloud {
    organization = "electroopticalvisions"
    workspaces {
        name = "EOVSource"
    }
  }
}
