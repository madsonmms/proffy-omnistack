import { Request, Response} from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utility/convertHourToMinutes';

//declaração dos tipos das variáveis dentro da schedule (array)
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
};


export default class ClassesController {

    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.subject || !filters.week_day || !filters.time) {
            return response.status(400).json({
                error: 'Missing filtes to seach classes'
            });
        };

        //as string informa para o ts que o time é uma string
        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                    
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    };
    
    async create(request: Request, response: Response) {
    
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        //inicia uma transaction, caso falhe em alguma parte todos os inserts são desfeitos
        const trx = await db.transaction();
    
        try{
            const insertedUsersId = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });
        
            const user_id = insertedUsersId[0];
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
        
            const class_id = insertedClassesIds[0];
        
            //(scheduleItem: ScheduleItem), informa que o ScheduleItem
            //possui o formato ScheduleItem imposto na interface
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) =>{
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });
        
            await trx('class_schedule').insert(classSchedule)
        
            //caso todas as alterações form um sucesso realiza commit
            await trx.commit();
        
            //código 201 = sucesso
            return response.status(201).send();
        } catch (err) {
            //desfaz as alterações caso algo tenha falhado na transaction
            await trx.rollback();
    
            console.log(err);
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
};