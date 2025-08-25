# Resume Templates Folder

This folder contains all 130 resume templates organized by categories.

## Folder Structure

```
resume-templates/
├── modern/           # 30 modern resume templates
├── classic/          # 30 classic resume templates  
├── creative/         # 30 creative resume templates
├── corporate/        # 30 corporate resume templates
├── special/          # 10 special premium templates
└── README.md        # This file
```

## Template Naming Convention

Templates should be named using the following format:
- `modern_01.pdf`, `modern_02.pdf`, ... `modern_30.pdf`
- `classic_01.pdf`, `classic_02.pdf`, ... `classic_30.pdf`
- `creative_01.pdf`, `creative_02.pdf`, ... `creative_30.pdf`
- `corporate_01.pdf`, `corporate_02.pdf`, ... `corporate_30.pdf`
- `special_01.pdf`, `special_02.pdf`, ... `special_10.pdf`

## Template Requirements

Each template should be:
- High-quality PDF format
- ATS-friendly design
- Professional appearance
- Optimized for specific industries/roles
- Between 1-2 pages in length

## Integration with Website

Templates are automatically detected and displayed in the website's template selection system. The `generateTemplates()` function in `/client/src/lib/resume-data.ts` will reference these files.

## Upload Instructions

1. Place PDF files in the appropriate category folders
2. Follow the naming convention exactly
3. Ensure files are under 5MB each
4. Verify PDF quality and formatting before upload

## File Access

Templates are served through the application's static file system and can be accessed via:
`/templates/{category}/{filename}`

Example: `/templates/modern/modern_01.pdf`