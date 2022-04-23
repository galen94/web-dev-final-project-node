import axios from "axios";
import express, {Express, Request, Response} from "express";
import AlertsControllerI from "../interfaces/alerts-controller-I";
const MBTA_API = 'https://api-v3.mbta.com';
const API_KEY = 'api_key=eb89c32aa05e4d9ea677b5c29a789f90'
const PAGE_LIMIT_5 = 'page[limit]=5';
const FILTER_BANNER = 'filter[banner]=true'
const ONGOING = 'filter[lifecycle]=ONGOING'

export default class AlertsController implements AlertsControllerI {
    private static alertsController: AlertsController | null = null;

    public static getInstance = (app: Express): AlertsController => {
        if (AlertsController.alertsController === null) {
            AlertsController.alertsController = new AlertsController();

            app.get('/api/alerts', AlertsController.alertsController.findAllAlerts);
            app.get('/api/alerts/:aid', AlertsController.alertsController.findAlertById)
        }

        return AlertsController.alertsController;
    }

    private constructor() {
    }

    async findAlertById(req: Request, res: Response): Promise<void> {
        const alertId = req.params.aid;
        const api_response = await axios.get(`${MBTA_API}/alerts/${alertId}?${API_KEY}`);
        const api_response_string = api_response.data.data;
        res.json(api_response_string);
    }

    async findAllAlerts(req: Request, res: Response): Promise<void> {
        const api_response = await axios.get(`${MBTA_API}/alerts?${API_KEY}&${PAGE_LIMIT_5}&${ONGOING}`);
        const api_response_string = api_response.data.data;
        res.json(api_response_string);
    }

}