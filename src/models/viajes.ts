import { Schema, models, model } from "mongoose";

export const ViajeSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    desde: {
        pais: String,
        ciudad: String,
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    hasta: {
        pais: String,
        ciudad: String,
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
        coordenadasExtras: {
            type: [String],
            default: [],
        },
    },
    cuando: {
        type: Date,
        required: [true, "La fecha de envío es obligatoria"],
    },
    horaSalida: {
        type: Date,
        required: [true, "La hora de salida es obligatoria"],
    },
    horaLlegada: {
        type: Date,
        required: [true, "La hora de llegada es obligatoria"],
    },
    eresFlexible: {
        type: Boolean,
        default: false,
    },
    estado: {
        type: Boolean,
    },
    precio: {
        type: [Number,Number,Number ],
        required: true,
    },

});

const Viaje = models.Viaje || model("Viaje", ViajeSchema);
export default Viaje;
