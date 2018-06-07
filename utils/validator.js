let Joi = require('joi');
let config = require('config');

const packageSchema = Joi.object().keys({
    id: Joi.string().min(1).max(30).required(),
    weight: Joi.number().integer().min(1).max(config.get('params.package_max_weight')).required()
});

module.exports = {
    validatePackages: (packages) => {
        return packages.reduce((errors, packageItem) => {
            let result = Joi.validate(packageItem, packageSchema);
            if (result.error !== null) {
                errors.push(result.error.details.map(detail => detail.message));
            }

            return errors;
        }, []);
    }
};