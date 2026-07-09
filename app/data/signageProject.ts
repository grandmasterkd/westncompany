export type SignageProjectImage = {
    src: string
    alt: string
  }
  
  export type SignageProjectSection = {
    id: string
    title: string
    description: string,
    tags: string[],
    collaborators: string[],
    images: SignageProjectImage[]
  }
  
  function SignageAsset(folder: string, filename: string): string {
    const rawBase = import.meta.env.BASE_URL || '/'
    const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`
    return `${base}legacy-projects/${folder}/${encodeURI(filename)}`
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
  ): SignageProjectSection {
    return {
      id,
      title,
      description,
      tags,
      collaborators,
      images: files.map((file) => ({
        src: SignageAsset(id, file),
        alt: altFromFilename(file),
      })),
    }
  }
  
  export const signageProjectSections: SignageProjectSection[] = [
    section('leyataa-hospital-signage', 'Leyataa Hospital', "", ["illustrations", "typography" , "label design", "signage" , "package design" , "health", "3D design"], [], [
      'Artboard 1.jpg',
      'Artboard 2.jpg',
      'Artboard 3.jpg',
      'Artboard 4.jpg',
      'Artboard 5.jpg',
      'Artboard 6.jpg',
      'Artboard 7.jpg',
   
      'Artboard 9.jpg',
   
      'Artboard 11.jpg',
      'Artboard 12.jpg',
      'Artboard 13.jpg',
      'Artboard 14.jpg',
      'Artboard 15.jpg',
    
      'Artboard 17.jpg',
      'Artboard 18.jpg',
      'Artboard 19.jpg',
      'Artboard 20.jpg',
      
      'Artboard 22.jpg',
     
      'Artboard 24.jpg',
      'Artboard 25.jpg',
      'Artboard 26.jpg',
      'Artboard 27.jpg',
      'Artboard 28.jpg',
   
      'Artboard 30.jpg',
      'Artboard 31.jpg',
      'Artboard 32.jpg',
      'Artboard 33.jpg',
      'Artboard 34.jpg',
      'Artboard 35.jpg',
      'Artboard 36.jpg',
      'Artboard 37.jpg',
      'Artboard 38.jpg',
      'Artboard 39.jpg',
      'Artboard 40.jpg',
      'Artboard 41.jpg',
      'Artboard 42.jpg', 
      'Artboard 43.jpg',
      'Artboard 44.jpg',
      'Artboard 45.jpg',
      'Artboard 46.jpg',
      'Artboard 47.jpg',
      'Artboard 48.jpg',
      'Artboard 49.jpg',
      'Artboard 50.jpg',
      'Artboard 51.jpg',
      'Artboard 52.jpg',
      'Artboard 53.jpg',
      'Artboard 54.jpg',
      'Artboard 55.jpg',
      'Artboard 56.jpg',
      'Artboard 57.jpg',
    ])
  ]
  