import { ScheduleCombination } from '../types/schedule';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Clock, AlertTriangle, CheckCircle, ArrowLeft, Users, MapPin } from 'lucide-react';
import { getScheduleStats } from '../utils/scheduler';

interface ScheduleViewerProps {
  combinations: ScheduleCombination[];
  onBack: () => void;
}

export function ScheduleViewer({ combinations, onBack }: ScheduleViewerProps) {
  const validCombinations = combinations.filter(c => !c.conflicts);
  const conflictCombinations = combinations.filter(c => c.conflicts);

  const dayOrder = ['Lun', 'Mar', 'Miérc', 'Jue', 'Vier', 'Sáb', 'Dom'];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Combinaciones de Horarios
              </CardTitle>
              <CardDescription>
                Se encontraron {validCombinations.length} horarios válidos sin conflictos
              </CardDescription>
            </div>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-2 mb-6">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>{validCombinations.length} horarios válidos</span>
              </div>
              {conflictCombinations.length > 0 && (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span>{conflictCombinations.length} con conflictos</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {validCombinations.length === 0 && (
        <Card className="border-warning">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <AlertTriangle className="h-12 w-12 text-warning mx-auto" />
              <h3 className="text-lg font-semibold">No se encontraron horarios válidos</h3>
              <p className="text-muted-foreground">
                Todas las combinaciones tienen conflictos de horario. 
                Intenta seleccionar menos clases o clases en horarios diferentes.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {validCombinations.map((combination, index) => {
          const stats = getScheduleStats(combination);
          
          return (
            <Card key={combination.id} className="border-success/20 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    Horario {index + 1}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <Users className="h-3 w-3" />
                      {stats.subjects} materias
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Calendar className="h-3 w-3" />
                      {stats.daysCount} días
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid gap-4">
                  {/* Vista de calendario semanal */}
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                    {dayOrder.map(day => {
                      const dayClasses = combination.classes.filter(cls => 
                        cls.dias.includes(day)
                      );
                      
                      return (
                        <div key={day} className="space-y-2">
                          <h4 className="font-semibold text-center text-sm bg-muted p-2 rounded">
                            {day}
                          </h4>
                          <div className="space-y-1 min-h-[100px]">
                            {dayClasses.map((cls, clsIndex) => (
                              <div
                                key={`${cls.crn}-${clsIndex}`}
                                className="p-2 bg-primary/10 border border-primary/20 rounded text-xs space-y-1"
                              >
                                <div className="font-medium text-primary truncate">
                                  {cls.materia.split(' - ')[0]}
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{cls.horaInicio} - {cls.horaFin}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{cls.aula}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Lista detallada de clases */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground">
                      Detalle de clases:
                    </h4>
                    <div className="grid gap-2">
                      {combination.classes.map((cls, clsIndex) => (
                        <div
                          key={`${cls.crn}-detail-${clsIndex}`}
                          className="flex flex-wrap items-center justify-between p-3 bg-muted/50 rounded text-sm"
                        >
                          <div className="space-y-1">
                            <div className="font-medium">{cls.materia}</div>
                            <div className="flex flex-wrap gap-3 text-muted-foreground">
                              <span>CRN: {cls.crn}</span>
                              <span>{cls.grupo}</span>
                              <span>{cls.dias.join(', ')} {cls.horaInicio} - {cls.horaFin}</span>
                            </div>
                          </div>
                          <div className="text-right text-muted-foreground">
                            <div>{cls.aula}</div>
                            <div className="text-xs">{cls.profesor}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {conflictCombinations.length > 0 && (
        <Card className="border-warning/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Horarios con Conflictos ({conflictCombinations.length})
            </CardTitle>
            <CardDescription>
              Estas combinaciones tienen traslapes de horario
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conflictCombinations.slice(0, 3).map((combination, index) => (
                <div key={combination.id} className="p-3 bg-warning/5 border border-warning/20 rounded">
                  <div className="font-medium text-warning mb-2">
                    Combinación {index + 1} (con conflictos)
                  </div>
                  <div className="grid gap-1 text-sm text-muted-foreground">
                    {combination.classes.map((cls, clsIndex) => (
                      <div key={`${cls.crn}-conflict-${clsIndex}`}>
                        {cls.materia} - {cls.dias.join(', ')} {cls.horaInicio} - {cls.horaFin}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {conflictCombinations.length > 3 && (
                <p className="text-sm text-muted-foreground">
                  Y {conflictCombinations.length - 3} combinaciones más con conflictos...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}