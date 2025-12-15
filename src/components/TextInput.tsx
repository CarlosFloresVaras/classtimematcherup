import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, Sparkles } from 'lucide-react';
import heroImage from '../assets/schedule-hero.jpg';

interface TextInputProps {
  onTextParsed: (text: string) => void;
}

export function TextInput({ onTextParsed }: TextInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onTextParsed(text);
    }
  };

  const exampleText = `Search
Showing 1 to 50 of 50 entries
Add	Code	Title	Section	Schedule	Credits	Campus	Building/Room	Location	Instructor	Course Attributes	Status	Availability	Shift
Select MLING2232019: Ética Profesional	R MLING2232019	Ética Profesional	1547	TuWe 5:30PM - 6:59PM	6.00	UPANA	*various*	*various*	Téllez Maqueo, Gamaliel	Enfoque de Derechos Humanos, Curso oficial - SEP	Available	10 of 10	Tiempo completo
Select MLING2232019: Ética Profesional	R MLING2232019	Ética Profesional	1718	MoTh 5:30PM - 6:59PM	6.00	UPANA	*various*	*various*	Bicieg Vázquez del Mercad, Alejandro Omar	Curso oficial - SEP, Enfoque de Derechos Humanos	Available	15 of 15	Tiempo completo
Select MLING2232019: Ética Profesional	R MLING2232019	Ética Profesional	1715	WeFr 5:30PM - 6:59PM	6.00	UPANA	Edificio de Campana : C 02	Mixcoac	Vera Zorrilla, Gonzalo	Enfoque de Derechos Humanos, Curso oficial - SEP	Available	4 of 4	Tiempo completo
Select MLING2134023: Programación Orientada a Objetos	R MLING2134023	Programación Orientada a Objetos	1517	MoWeFr 8:30AM - 9:59AM	8.00	UPANA	Edificio Rodin : CDC_D	Mixcoac	López González, Marián	Curso oficial - SEP	Available	21 of 21	Tiempo completo
Select MLING2134023: Programación Orientada a Objetos	R MLING2134023	Programación Orientada a Objetos	1499	MoThFr 8:30AM - 9:59AM	8.00	UPANA	*various*	*various*	Benítez Villacreses, Giancarlo Xavier	Curso oficial - SEP	Available	22 of 22	Tiempo completo
Select MLING2134023: Programación Orientada a Objetos	R MLING2134023	Programación Orientada a Objetos	1496	TuWeTh 10:00AM - 11:29AM	8.00	UPANA	*various*	*various*	Carreras Cruz, María Victoria	Curso oficial - SEP	Available	1 of 1	Tiempo completo
Select MLING2134026: Liderazgo y Comunicación Efectiva	R MLING2134026	Liderazgo y Comunicación Efectiva	1607	We 1:00PM - 2:29PM	6.00	UPANA	*various*	*various*	Díez Arce, Francisco Nemesio	Curso oficial - SEP	Available	4 of 4	Tiempo completo
Select MLING2134026: Liderazgo y Comunicación Efectiva	R MLING2134026	Liderazgo y Comunicación Efectiva	1615	Mo 7:00AM - 8:29AM	6.00	UPANA	*various*	*various*	Becerril Isidro, Javier	Curso oficial - SEP	Available	22 of 22	Tiempo completo
Select MLING2134026: Liderazgo y Comunicación Efectiva	R MLING2134026	Liderazgo y Comunicación Efectiva	1619	MoWe 2:30PM - 3:59PM	6.00	UPANA	*various*	*various*	Sánchez Vizcaya, Claudia Susana	Curso oficial - SEP	Available	11 of 11	Tiempo completo
Select MLING2134027: Cálculo Vectorial	R MLING2134027	Cálculo Vectorial	1461	Mo 11:30AM - 12:59PM	8.00	UPANA	Edificio Nuevo Rodin : NR 07	Mixcoac	Morales Huerta, David Iván	Curso oficial - SEP	Available	4 of 4	Tiempo completo
Select MLING2134027: Cálculo Vectorial	R MLING2134027	Cálculo Vectorial	1456	TuWeTh 8:30AM - 9:59AM	8.00	UPANA	*various*	*various*	Carranco Gallardo, Zorayda	Curso oficial - SEP	Available	14 of 14	Tiempo completo
Select MLING2134028: Ecuaciones Diferenciales	R MLING2134028	Ecuaciones Diferenciales	1243	WeFr 4:00PM - 5:29PM	6.00	UPANA	*various*	*various*	Quintero Zamarrón, Miguel Angel	Curso oficial - SEP	Available	1 of 1	Tiempo completo
Select MLING2134028: Ecuaciones Diferenciales	R MLING2134028	Ecuaciones Diferenciales	1248	Tu 7:00AM - 8:29AM	6.00	UPANA	*various*	*various*	Sánchez Santos, Oscar	Curso oficial - SEP	Available	14 of 14	Tiempo completo
Select MLING2134037: Sistemas Operativos	R MLING2134037	Sistemas Operativos	1761	MoWe 5:30PM - 6:59PM	6.00	UPANA	Edificio Rodin : CDC_C	Mixcoac	Lopez Guerrero, Iram Maximiliano	Curso oficial - SEP	Available	3 of 3	Tiempo completo
Select MLING2134038: Inteligencia Artificial	R MLING2134038	Inteligencia Artificial	1587	TuWe 10:00AM - 11:29AM	6.00	UPANA	Edificio Valencia 106 : V_LAB_CO	Mixcoac	Calabrese, Juan Bernardo	Curso oficial - SEP	Available	25 of 25	Tiempo completo
Select MLING2134038: Inteligencia Artificial	R MLING2134038	Inteligencia Artificial	1588	TuWe 1:00PM - 2:29PM	6.00	UPANA	*various*	*various*	Calabrese, Juan Bernardo	Curso oficial - SEP	Available	25 of 25	Tiempo completo
Select MLHUM2229298: Historia de la cultura	R MLHUM2229298	Historia de la cultura	1991	MoWe 2:30PM - 3:59PM	6.00	UPANA	*various*	*various*	González Meynhardt, Elizabeth de Lourdes	Curso oficial - SEP, Enfoque de Derechos Humanos	Available	3 of 3	Tiempo completo
Select MLHUM2229298: Historia de la cultura	R MLHUM2229298	Historia de la cultura	2040	Fr 8:30AM - 9:59AM	6.00	UPANA	*various*	*various*	de la Peña Ponce de León, Elisa	Curso oficial - SEP, Enfoque de Derechos Humanos	Available	5 of 20	Tiempo completo
Select MLHUM2229299: Persona y sociedad	R MLHUM2229299	Persona y sociedad	2037	We 1:00PM - 2:29PM	6.00	UPANA	Edificio Rodin : R 44	Mixcoac	Rivas Calderón, Victor Hugo	Enfoque de Derechos Humanos, Curso oficial - SEP	Available	18 of 18	Tiempo completo
Select MLHUM2229299: Persona y sociedad	R MLHUM2229299	Persona y sociedad	1960	MoTh 7:00AM - 8:29AM	6.00	UPANA	*various*	*various*	González Nares, Gabriel	Curso oficial - SEP, Enfoque de Derechos Humanos	Available	16 of 16	Tiempo completo
Show
ALL
entries
Showing 1 to 50 of 50 entries
Previous1Next`;

  return (
    <div className="min-h-screen relative">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary/20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
            Generador de Horarios UP
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Optimiza tu horario universitario de manera inteligente. 
            Importa tus materias y genera las mejores combinaciones posibles.
          </p>
        </div>
        
        <Card className="backdrop-blur-md bg-card/80 border-primary/20 shadow-2xl">
          <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">
                Paso 1: Importar Datos
              </CardTitle>
            </div>
            <CardDescription className="text-base">
              Pega aquí el texto copiado desde el portal universitario para generar tu horario óptimo
            </CardDescription>
          </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="schedule-text" className="text-sm font-medium">
              Texto del Portal Universitario
            </label>
            <Textarea
              id="schedule-text"
              placeholder="Pega aquí el texto copiado del portal..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-48 font-mono text-sm"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleSubmit} 
              disabled={!text.trim()}
              className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-all"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Procesar Horarios
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setText(exampleText)}
              className="flex-1"
            >
              Usar Ejemplo
            </Button>
          </div>
          
          {text.trim() && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                ✓ Texto listo para procesar ({text.split('\n').filter(l => l.trim()).length} líneas)
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
