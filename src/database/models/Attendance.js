const createAttendanceModel = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    petId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    vetId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  }, {
    underscored: true,
    tableName: 'attendances',
    timestamps: false
  });

  return Attendance;
};

module.exports = createAttendanceModel;