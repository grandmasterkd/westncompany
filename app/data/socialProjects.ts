export type socialProjectImage = {
    src: string
    alt: string
  }
  
  export type socialProjectSection = {
    id: string
    title: string
    description: string,
    tags: string[],
    collaborators: string[],
    images: socialProjectImage[]
  }
  
  function socialAsset(folder: string, filename: string): string {
    const rawBase = import.meta.env.BASE_URL || '/'
    const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`
    return `${base}social-media/${folder}/${encodeURI(filename)}`
  }
  
  function altFromFilename(filename: string): string {
    const base = filename.replace(/\.[^.]+$/, '')
    return base
      .replace(/[@_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }
  
  function section(
    id: string,
    title: string,
    description: string,
    tags: string[],
    collaborators: string[],
    files: readonly string[],
  ): socialProjectSection {
    return {
      id,
      title,
      description,
      tags,
      collaborators,
      images: files.map((file) => ({
        src: socialAsset(id, file),
        alt: altFromFilename(file),
      })),
    }
  }
  
  export const socialProjectSections: socialProjectSection[] = [
    section('digistore', 'Digistore Africa', "", ["illustrations", "typography" , "social media design", "campaign design" , "B2B" , "technology"], [], [
      '0.jpg',
      '1.jpg',
      '2.jpg',
      '3.jpg',
      '4.jpg',
      '5.jpg',
      '6.jpg',
      '7.jpg',
      '8.jpg',
      '9.jpg',
      '10.jpg',
     
    
    ]),
    section('restorefine', 'Resto Refine Studios', "", ["illustrations", "graphic design", "social media posts", "typography" , "social media design", "campaign design" , "B2B" , "hospitality"], [], [
        'restorefine_sm_p2.jpg',
        'socialmediapost3_update2-01.jpg',
        'socialmediapost5-01.jpg',
        'socialmediapost8.jpg',
        'socialmediapost13-01.jpg',
        'socialmediapost13-02.jpg',
        'socialmediapost13-03.jpg',
        'socialmediapost15_update1.jpg',
        "socialmediapost14_update1_black-01.jpg"
      ])
   
  ]
  