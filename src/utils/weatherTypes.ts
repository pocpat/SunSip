export interface Weather {
    description: string;
    main: string;
  }
  
  export interface promptWeatherDescription {
    id: number;
    name: string;
    weather: Weather[];
    main: {
      feels_like: number;
    };
    message?: string;
    wind?: { speed: number };
    visibility?: number;
    currentMonthInWords?: string;
    buildPrompt?: string;
   
  }
  export type WeatherData = {
    id: number
    name: string
    weather: Weather[]
    main: {
      temp: number
      feels_like: number
    }
    message?: string
    wind: Wind
    visibility: number
  }
  
  export type Wind = {
    speed: number;
    description:  string;
  }
  
  export type WindowImg = {
    img: string;
    errMessage: string;
  }
  export type windowPrompt = {
    windowPrompt?: string;
    }