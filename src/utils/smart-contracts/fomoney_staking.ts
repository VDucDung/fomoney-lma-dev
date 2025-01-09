/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/fomoney_staking.json`.
 */
export type FomoneyStaking = {
  address: "Fv3ynrwVpiwHwBfN9qwTWrzvxdqkpMb3wiDCrVy9jfGM";
  metadata: {
    name: "fomoneyStaking";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "claimReward";
      discriminator: [149, 95, 181, 242, 94, 90, 158, 162];
      accounts: [
        {
          name: "master";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              },
            ];
          };
        },
        {
          name: "seasonalTvlPool";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  101,
                  97,
                  115,
                  111,
                  110,
                  97,
                  108,
                  95,
                  116,
                  118,
                  108,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "arg";
                path: "seasonId";
              },
            ];
          };
        },
        {
          name: "seasonalPoolPrize";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  101,
                  97,
                  115,
                  111,
                  110,
                  97,
                  108,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  112,
                  114,
                  105,
                  122,
                  101,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "arg";
                path: "seasonId";
              },
            ];
          };
        },
        {
          name: "userSeasonalInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  101,
                  97,
                  110,
                  111,
                  110,
                  97,
                  108,
                  95,
                  105,
                  110,
                  102,
                  111,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "arg";
                path: "seasonId";
              },
              {
                kind: "account";
                path: "signer";
              },
            ];
          };
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "seasonId";
          type: "u64";
        },
      ];
    },
    {
      name: "deposit";
      discriminator: [242, 35, 198, 137, 82, 225, 242, 182];
      accounts: [
        {
          name: "master";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              },
            ];
          };
        },
        {
          name: "userSeasonalInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  101,
                  97,
                  110,
                  111,
                  110,
                  97,
                  108,
                  95,
                  105,
                  110,
                  102,
                  111,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "account";
                path: "master.season_id";
                account: "master";
              },
              {
                kind: "account";
                path: "signer";
              },
            ];
          };
        },
        {
          name: "seasonalTvlPool";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  101,
                  97,
                  115,
                  111,
                  110,
                  97,
                  108,
                  95,
                  116,
                  118,
                  108,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "account";
                path: "master.season_id";
                account: "master";
              },
            ];
          };
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
      ];
    },
    {
      name: "endSeason";
      discriminator: [167, 166, 166, 109, 166, 71, 15, 68];
      accounts: [
        {
          name: "master";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              },
            ];
          };
        },
        {
          name: "seasonalTvlPool";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  101,
                  97,
                  115,
                  111,
                  110,
                  97,
                  108,
                  95,
                  116,
                  118,
                  108,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "account";
                path: "master.season_id";
                account: "master";
              },
            ];
          };
        },
        {
          name: "seasonalPoolPrize";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  101,
                  97,
                  115,
                  111,
                  110,
                  97,
                  108,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  112,
                  114,
                  105,
                  122,
                  101,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "account";
                path: "master.season_id";
                account: "master";
              },
            ];
          };
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "leaderboards";
          type: {
            array: ["pubkey", 10];
          };
        },
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "master";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              },
            ];
          };
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "authority";
          type: "pubkey";
        },
      ];
    },
    {
      name: "joinGame";
      discriminator: [107, 112, 18, 38, 56, 173, 60, 128];
      accounts: [
        {
          name: "master";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              },
            ];
          };
        },
        {
          name: "seasonalTvlPool";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  101,
                  97,
                  115,
                  111,
                  110,
                  97,
                  108,
                  95,
                  116,
                  118,
                  108,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "account";
                path: "master.season_id";
                account: "master";
              },
            ];
          };
        },
        {
          name: "seasonalPoolPrize";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  101,
                  97,
                  115,
                  111,
                  110,
                  97,
                  108,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  112,
                  114,
                  105,
                  122,
                  101,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "account";
                path: "master.season_id";
                account: "master";
              },
            ];
          };
        },
        {
          name: "userSeasonalInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  101,
                  97,
                  110,
                  111,
                  110,
                  97,
                  108,
                  95,
                  105,
                  110,
                  102,
                  111,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "account";
                path: "master.season_id";
                account: "master";
              },
              {
                kind: "account";
                path: "signer";
              },
            ];
          };
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "masterClaim";
      discriminator: [171, 44, 98, 137, 29, 246, 89, 152];
      accounts: [
        {
          name: "master";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              },
            ];
          };
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
      ];
    },
    {
      name: "releaseSeason";
      discriminator: [91, 127, 139, 119, 225, 215, 83, 221];
      accounts: [
        {
          name: "master";
          writable: true;
        },
        {
          name: "seasonalTvlPool";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  101,
                  97,
                  115,
                  111,
                  110,
                  97,
                  108,
                  95,
                  116,
                  118,
                  108,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "account";
                path: "master.next_season_id";
                account: "master";
              },
            ];
          };
        },
        {
          name: "seasonalPoolPrize";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  101,
                  97,
                  115,
                  111,
                  110,
                  97,
                  108,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  112,
                  114,
                  105,
                  122,
                  101,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "account";
                path: "master.next_season_id";
                account: "master";
              },
            ];
          };
        },
        {
          name: "preSeasonalTvlPool";
          optional: true;
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "startTime";
          type: "u64";
        },
      ];
    },
    {
      name: "updateMaster";
      discriminator: [102, 48, 171, 171, 167, 236, 222, 239];
      accounts: [
        {
          name: "master";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "newAuthority";
          type: "pubkey";
        },
        {
          name: "seasonDuration";
          type: "u64";
        },
        {
          name: "keyPerLamports";
          type: "u64";
        },
        {
          name: "pointPerKey";
          type: "u64";
        },
        {
          name: "fee";
          type: "u64";
        },
        {
          name: "oneHundredPercent";
          type: "u64";
        },
      ];
    },
    {
      name: "withdrawal";
      discriminator: [198, 86, 72, 244, 40, 3, 17, 71];
      accounts: [
        {
          name: "master";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              },
            ];
          };
        },
        {
          name: "seasonalTvlPool";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  101,
                  97,
                  115,
                  111,
                  110,
                  97,
                  108,
                  95,
                  116,
                  118,
                  108,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "arg";
                path: "seasonId";
              },
            ];
          };
        },
        {
          name: "userSeasonalInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  101,
                  97,
                  110,
                  111,
                  110,
                  97,
                  108,
                  95,
                  105,
                  110,
                  102,
                  111,
                  95,
                  115,
                  101,
                  101,
                  100,
                ];
              },
              {
                kind: "arg";
                path: "seasonId";
              },
              {
                kind: "account";
                path: "signer";
              },
            ];
          };
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "seasonId";
          type: "u64";
        },
        {
          name: "amount";
          type: "u64";
        },
      ];
    },
  ];
  accounts: [
    {
      name: "master";
      discriminator: [168, 213, 193, 12, 77, 162, 58, 235];
    },
    {
      name: "seasonTvlPool";
      discriminator: [127, 147, 178, 237, 183, 192, 28, 63];
    },
    {
      name: "seasonalPoolPrize";
      discriminator: [13, 159, 220, 149, 218, 187, 221, 118];
    },
    {
      name: "userSeasonalInfo";
      discriminator: [199, 138, 124, 88, 116, 189, 218, 1];
    },
  ];
  events: [
    {
      name: "claimRewardEvent";
      discriminator: [207, 16, 14, 170, 176, 71, 40, 53];
    },
    {
      name: "depositEvent";
      discriminator: [120, 248, 61, 83, 31, 142, 107, 144];
    },
    {
      name: "endSeasonEvent";
      discriminator: [119, 240, 148, 242, 108, 84, 32, 63];
    },
    {
      name: "initializeMasterEvent";
      discriminator: [16, 2, 33, 5, 33, 252, 181, 203];
    },
    {
      name: "joinGameEvent";
      discriminator: [179, 248, 214, 123, 250, 99, 243, 236];
    },
    {
      name: "masterClaimEvent";
      discriminator: [90, 101, 75, 152, 130, 123, 72, 161];
    },
    {
      name: "releaseSeasonEvent";
      discriminator: [3, 5, 70, 187, 247, 63, 5, 178];
    },
    {
      name: "updateMasterEvent";
      discriminator: [137, 21, 42, 215, 186, 109, 163, 137];
    },
    {
      name: "withdrawalEvent";
      discriminator: [161, 53, 185, 18, 98, 254, 54, 165];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "alreadyInitialized";
      msg: "The program has already been initialized. Re-initialization is not allowed.";
    },
    {
      code: 6001;
      name: "unauthorized";
      msg: "Unauthorized: you do not have the required permissions to perform this action.";
    },
    {
      code: 6002;
      name: "seasonNotEnd";
      msg: "Season: the current season has not ended yet.";
    },
    {
      code: 6003;
      name: "seasonInPassed";
      msg: "Season: the start time has already passed.";
    },
    {
      code: 6004;
      name: "invalidPreSeason";
      msg: "Season: the pre-season is not init.";
    },
    {
      code: 6005;
      name: "seasonNotStart";
      msg: "Season: the season is not start";
    },
    {
      code: 6006;
      name: "seasonHadEnded";
      msg: "Season: the season had ended";
    },
    {
      code: 6007;
      name: "seasonNotEnded";
      msg: "Season: the season not end";
    },
    {
      code: 6008;
      name: "seasonNotActive";
      msg: "Season: the season is not active";
    },
    {
      code: 6009;
      name: "invalidDepositAmount";
      msg: "Deposit: invalid deposit amount";
    },
    {
      code: 6010;
      name: "invalidConfiguration";
      msg: "Configuration: invalid configuration";
    },
    {
      code: 6011;
      name: "unauthorizedSigner";
      msg: "Unauthorized: unauthorized signer for seasonal account";
    },
    {
      code: 6012;
      name: "invalidSeasonId";
      msg: "Season: Invalid season id";
    },
    {
      code: 6013;
      name: "invalidWithdrawalAmount";
      msg: "Withdrawal: Invalid withdrawal amount";
    },
    {
      code: 6014;
      name: "insufficientPoolBalance";
      msg: "Withdrawal: Insufficient Pool TVL Balance";
    },
    {
      code: 6015;
      name: "insufficientKeys";
      msg: "Account: Insufficient Key";
    },
    {
      code: 6016;
      name: "invalidFee";
      msg: "Platform: Invalid platform fee";
    },
    {
      code: 6017;
      name: "notInLeaderboards";
      msg: "User must in the top 10 leader board";
    },
  ];
  types: [
    {
      name: "claimRewardEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seasonId";
            type: "u64";
          },
          {
            name: "account";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "depositEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "account";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "point";
            type: "u64";
          },
          {
            name: "key";
            type: "u64";
          },
          {
            name: "usedKey";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "endSeasonEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seasonId";
            type: "u64";
          },
          {
            name: "platformFee";
            type: "u64";
          },
          {
            name: "poolPrize";
            type: "u64";
          },
          {
            name: "leaderBoards";
            type: {
              array: ["pubkey", 10];
            };
          },
        ];
      };
    },
    {
      name: "initializeMasterEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "seasonId";
            type: "u64";
          },
          {
            name: "nextSeasonId";
            type: "u64";
          },
          {
            name: "seasonDuration";
            type: "u64";
          },
          {
            name: "keyPerLamports";
            type: "u64";
          },
          {
            name: "pointPerKey";
            type: "u64";
          },
          {
            name: "fee";
            type: "u64";
          },
          {
            name: "oneHundredPercent";
            type: "u64";
          },
          {
            name: "feeCollected";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "joinGameEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seasonId";
            type: "u64";
          },
          {
            name: "seasonalStart";
            type: "u64";
          },
          {
            name: "seasonalEnd";
            type: "u64";
          },
          {
            name: "seasonalTvlPool";
            type: "pubkey";
          },
          {
            name: "seasonalPoolPrize";
            type: "pubkey";
          },
          {
            name: "userPubkey";
            type: "pubkey";
          },
          {
            name: "usedKey";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "master";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "seasonId";
            type: "u64";
          },
          {
            name: "nextSeasonId";
            type: "u64";
          },
          {
            name: "seasonDuration";
            type: "u64";
          },
          {
            name: "keyPerLamports";
            type: "u64";
          },
          {
            name: "pointPerKey";
            type: "u64";
          },
          {
            name: "fee";
            type: "u64";
          },
          {
            name: "oneHundredPercent";
            type: "u64";
          },
          {
            name: "feeCollected";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "masterClaimEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "masterKey";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "releaseSeasonEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seasonId";
            type: "u64";
          },
          {
            name: "seasonalStart";
            type: "u64";
          },
          {
            name: "seasonalEnd";
            type: "u64";
          },
          {
            name: "seasonalTvlPool";
            type: "pubkey";
          },
          {
            name: "seasonalPoolPrize";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "seasonTvlPool";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seasonId";
            type: "u64";
          },
          {
            name: "deposited";
            type: "u64";
          },
          {
            name: "start";
            type: "u64";
          },
          {
            name: "end";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "seasonalPoolPrize";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seasonId";
            type: "u64";
          },
          {
            name: "poolPrize";
            type: "u64";
          },
          {
            name: "prizePerWinner";
            type: "u64";
          },
          {
            name: "leaderBoards";
            type: {
              array: ["pubkey", 10];
            };
          },
        ];
      };
    },
    {
      name: "updateMasterEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "seasonDuration";
            type: "u64";
          },
          {
            name: "keyPerLamports";
            type: "u64";
          },
          {
            name: "pointPerKey";
            type: "u64";
          },
          {
            name: "fee";
            type: "u64";
          },
          {
            name: "oneHundredPercent";
            type: "u64";
          },
          {
            name: "feeCollected";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "userSeasonalInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seasonId";
            type: "u64";
          },
          {
            name: "deposited";
            type: "u64";
          },
          {
            name: "key";
            type: "u64";
          },
          {
            name: "usedKey";
            type: "u64";
          },
          {
            name: "point";
            type: "u64";
          },
          {
            name: "userPubkey";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "withdrawalEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "seasonId";
            type: "u64";
          },
          {
            name: "amount";
            type: "u64";
          },
        ];
      };
    },
  ];
};
